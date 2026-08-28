const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { after, before, test } = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const CHANGED_HTML_PAGES = [
    '404.html',
    'about.html',
    'careers.html',
    'contact.html',
    'faq.html',
    'index.html',
    'legal.html',
    'news-details.html',
    'news-grid.html',
    'news.html',
    'pricing.html',
    'project-details.html',
    'project.html',
    'service-details.html',
    'service.html',
    'team-details.html',
    'team.html',
    'technology.html',
    'terms-and-conditions.html',
];

let serverProcess;
let serverPort;
let serverOutput = '';

function request(urlPath) {
    return new Promise((resolve, reject) => {
        const req = http.request(
            { host: 'localhost', port: serverPort, path: urlPath },
            (res) => {
                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', () => resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: Buffer.concat(chunks),
                }));
            },
        );
        req.once('error', reject);
        req.setTimeout(5_000, () => {
            req.destroy(new Error(`Timed out requesting ${urlPath}`));
        });
        req.end();
    });
}

function startDevServer() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Timed out starting dev server. Output:\n${serverOutput}`));
        }, 10_000);

        serverProcess = spawn(process.execPath, ['dev-server.js'], {
            cwd: ROOT,
            stdio: ['ignore', 'pipe', 'pipe'],
        });

        const handleOutput = (chunk) => {
            serverOutput += chunk.toString();
            const match = serverOutput.match(/http:\/\/localhost:(\d+)/);
            if (match) {
                clearTimeout(timeout);
                serverPort = Number(match[1]);
                resolve();
            }
        };

        serverProcess.stdout.on('data', handleOutput);
        serverProcess.stderr.on('data', handleOutput);
        serverProcess.once('error', (error) => {
            clearTimeout(timeout);
            reject(error);
        });
        serverProcess.once('exit', (code, signal) => {
            if (!serverPort) {
                clearTimeout(timeout);
                reject(new Error(
                    `Dev server exited before startup (code ${code}, signal ${signal}). Output:\n${serverOutput}`,
                ));
            }
        });
    });
}

before(async () => {
    await startDevServer();
});

after(async () => {
    if (serverProcess && serverProcess.exitCode === null) {
        serverProcess.kill('SIGTERM');
        await new Promise((resolve) => serverProcess.once('exit', resolve));
    }
});

test('starts on a reported local port', () => {
    assert.ok(Number.isInteger(serverPort));
    assert.ok(serverPort >= 3000);
    assert.match(serverOutput, new RegExp(`http://localhost:${serverPort}`));
});

test('serves the home page for root and query-string requests', async () => {
    const [rootResponse, queryResponse] = await Promise.all([
        request('/'),
        request('/index.html?preview=true'),
    ]);

    for (const response of [rootResponse, queryResponse]) {
        assert.equal(response.statusCode, 200);
        assert.match(response.headers['content-type'], /^text\/html/);
        assert.match(response.body.toString(), /<title>Adople AI - Quantitative Systematic Platform<\/title>/);
    }
});

test('injects one live-reload client before the closing body tag', async () => {
    const response = await request('/index.html');
    const html = response.body.toString();

    assert.equal((html.match(/<!-- Live Reload Script -->/g) || []).length, 1);
    assert.match(html, /new EventSource\('\/__livereload'\)/);
    assert.ok(html.indexOf('<!-- Live Reload Script -->') < html.indexOf('</body>'));
});

test('serves every changed HTML page with the shared theme and no-cache headers', async () => {
    for (const page of CHANGED_HTML_PAGES) {
        const response = await request(`/${page}`);
        const html = response.body.toString();

        assert.equal(response.statusCode, 200, page);
        assert.equal(response.headers['cache-control'], 'no-cache, no-store, must-revalidate', page);
        assert.equal(response.headers.pragma, 'no-cache', page);
        assert.equal(response.headers.expires, '0', page);
        assert.equal(
            (html.match(/assets\/css\/two-sigma-theme\.css/g) || []).length,
            1,
            `${page} should load the shared theme exactly once`,
        );
    }
});

test('serves text, image, and unknown file types with the expected MIME types', async () => {
    const cases = [
        ['/assets/css/two-sigma-theme.css', 'text/css; charset=UTF-8'],
        ['/assets/img/logo/logo.webp', 'image/webp'],
        ['/README.md', 'application/octet-stream'],
    ];

    for (const [urlPath, contentType] of cases) {
        const response = await request(urlPath);
        const expected = fs.readFileSync(path.join(ROOT, urlPath));

        assert.equal(response.statusCode, 200, urlPath);
        assert.equal(response.headers['content-type'], contentType, urlPath);
        assert.deepEqual(response.body, expected, urlPath);
    }
});

test('returns 404 for missing files and directories', async () => {
    for (const urlPath of ['/missing-page.html', '/assets/']) {
        const response = await request(urlPath);

        assert.equal(response.statusCode, 404, urlPath);
        assert.equal(response.headers['content-type'], 'text/plain', urlPath);
        assert.equal(response.body.toString(), '404 Not Found', urlPath);
    }
});

test('rejects encoded directory traversal attempts', async () => {
    const response = await request('/%2e%2e/package.json');

    assert.equal(response.statusCode, 403);
    assert.equal(response.body.toString(), 'Forbidden');
});

test('announces live-reload connections and broadcasts filesystem changes', async () => {
    const fixture = path.join(ROOT, '.live-reload-test.txt');

    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            req.destroy();
            reject(new Error('Timed out waiting for live-reload events'));
        }, 5_000);
        let events = '';

        const req = http.request(
            { host: 'localhost', port: serverPort, path: '/__livereload' },
            (res) => {
                assert.equal(res.statusCode, 200);
                assert.equal(res.headers['content-type'], 'text/event-stream');
                assert.equal(res.headers['cache-control'], 'no-cache');
                assert.equal(res.headers['access-control-allow-origin'], '*');

                res.on('data', (chunk) => {
                    events += chunk.toString();
                    if (events.includes('data: connected') && !fs.existsSync(fixture)) {
                        fs.writeFileSync(fixture, 'trigger reload');
                    }
                    if (events.includes('data: reload')) {
                        clearTimeout(timeout);
                        res.destroy();
                        req.destroy();
                        resolve();
                    }
                });
            },
        );

        req.once('error', (error) => {
            if (error.code !== 'ECONNRESET') reject(error);
        });
        req.end();
    }).finally(() => fs.rmSync(fixture, { force: true }));
});

test('new navigation destinations and testimonial assets remain wired from the home page', () => {
    const home = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

    for (const page of [
        'careers.html',
        'legal.html',
        'technology.html',
        'terms-and-conditions.html',
    ]) {
        assert.match(home, new RegExp(`href=["']${page.replace('.', '\\.')}`), page);
        assert.ok(fs.statSync(path.join(ROOT, page)).isFile(), page);
    }

    for (const name of ['andrew', 'brahm', 'chris', 'emily', 'evan', 'jin', 'joanne']) {
        for (const suffix of ['.jpg', '-thumb.jpg']) {
            const relativePath = `assets/img/home-1/testimonial/twosigma-${name}${suffix}`;
            assert.match(home, new RegExp(relativePath.replaceAll('.', '\\.')), relativePath);
            assert.ok(fs.statSync(path.join(ROOT, relativePath)).size > 0, relativePath);
        }
    }
});
