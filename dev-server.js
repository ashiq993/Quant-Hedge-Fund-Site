const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.mp4': 'video/mp4'
};

// Connected live-reload clients (Server-Sent Events)
let clients = [];

// Watch directory recursively for changes
let reloadTimeout = null;
fs.watch(ROOT, { recursive: true }, (eventType, filename) => {
    if (!filename) return;
    // Ignore node_modules, .git, and dev-server itself
    if (filename.includes('.git') || filename.includes('node_modules') || filename === 'dev-server.js') return;

    if (reloadTimeout) clearTimeout(reloadTimeout);
    reloadTimeout = setTimeout(() => {
        console.log(`[Auto-Reload] File changed: ${filename} -> Refreshing connected browser(s)...`);
        clients.forEach(res => {
            try {
                res.write('data: reload\n\n');
            } catch (e) {}
        });
    }, 100);
});

// Live reload client snippet injected into HTML
const LIVE_RELOAD_SCRIPT = `
<!-- Live Reload Script -->
<script>
(function() {
    if (typeof EventSource !== 'undefined') {
        const source = new EventSource('/__livereload');
        source.onmessage = function(event) {
            if (event.data === 'reload') {
                console.log('[LiveReload] Change detected, reloading page...');
                window.location.reload();
            }
        };
        source.onerror = function() {
            console.log('[LiveReload] Disconnected. Waiting for server...');
        };
    }
})();
</script>
`;

const server = http.createServer((req, res) => {
    // SSE Endpoint for Live Reload
    if (req.url === '/__livereload') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });
        res.write('data: connected\n\n');
        clients.push(res);
        req.on('close', () => {
            clients = clients.filter(client => client !== res);
        });
        return;
    }

    // Normalize URL and determine file path
    let reqUrl = req.url.split('?')[0];
    if (reqUrl === '/') reqUrl = '/index.html';
    
    const filePath = path.join(ROOT, decodeURIComponent(reqUrl));

    // Security check: prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Set No-Cache headers so ordinary manual refresh is ALWAYS fresh
        const headers = {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        };

        if (ext === '.html') {
            fs.readFile(filePath, 'utf8', (readErr, content) => {
                if (readErr) {
                    res.writeHead(500);
                    res.end('Server Error');
                    return;
                }
                // Inject live reload script before </body> if present, or append
                let modifiedContent = content;
                if (content.includes('</body>')) {
                    modifiedContent = content.replace('</body>', `${LIVE_RELOAD_SCRIPT}\n</body>`);
                } else {
                    modifiedContent = content + LIVE_RELOAD_SCRIPT;
                }
                res.writeHead(200, headers);
                res.end(modifiedContent);
            });
        } else {
            res.writeHead(200, headers);
            fs.createReadStream(filePath).pipe(res);
        }
    });
});

function startServer(port) {
    server.listen(port, () => {
        console.log(`====================================================`);
        console.log(`🚀 Live Reload Dev Server is running at:`);
        console.log(`👉 http://localhost:${port}`);
        console.log(`👉 http://localhost:${port}/index.html`);
        console.log(`🔥 Automatic Live Reload & Instant Refresh are ACTIVE`);
        console.log(`   (Any change to HTML/CSS/JS will reload the browser automatically)`);
        console.log(`====================================================`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} is in use, switching to port ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(PORT);
