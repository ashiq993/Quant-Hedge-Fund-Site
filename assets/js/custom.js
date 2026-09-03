/**
 * ======================================
 * Custom Site Scripts
 * ======================================
 */

(function($) {
    "use strict";

    $(document).ready(function() {
        // Mailto trigger for Institutional Newsletter & CTA email forms right above footer
        $(document).on('submit', '.cta-newsletter-section form, .newsletter-form form', function(e) {
            e.preventDefault();
            var $form = $(this);
            var emailVal = $form.find('input[type="text"], input[type="email"]').val();
            var mailtoUrl = 'mailto:info@adople.ai?subject=Institutional%20Portal%20Gateway%20Request';
            if (emailVal && emailVal.trim() !== '') {
                mailtoUrl += '&body=Hello%20Adople%20AI%20Team,%0A%0AI%20would%20like%20to%20request%20credentials%20for%20the%20Institutional%20Gated%20Portal.%0A%0AInstitutional%20Email:%20' + encodeURIComponent(emailVal.trim());
            }
            window.location.href = mailtoUrl;
        });

        // Direct button click handler
        $(document).on('click', '.cta-newsletter-section .email-btn, .newsletter-form .email-btn', function(e) {
            e.preventDefault();
            var $form = $(this).closest('form');
            if ($form.length) {
                $form.trigger('submit');
            } else {
                window.location.href = 'mailto:info@adople.ai?subject=Institutional%20Portal%20Gateway%20Request';
            }
        });

        // Hero Scroll Down Button & Smooth Anchor Navigation
        $(document).on('click', '.scroll-down-btn, a[href^="#sec-"]', function(e) {
            var target = $(this).attr('href');
            if (target && target.startsWith('#') && target.length > 1) {
                var $targetEl = $(target);
                if ($targetEl.length) {
                    e.preventDefault();
                    if (window.ScrollSmoother && ScrollSmoother.get()) {
                        ScrollSmoother.get().scrollTo($targetEl[0], true, "top 90px");
                    } else {
                        $('html, body').stop().animate({
                            scrollTop: $targetEl.offset().top - 90
                        }, 600);
                    }
                }
            }
        });
    });

})(jQuery);