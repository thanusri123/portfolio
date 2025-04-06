// js/main.js
$(document).ready(function() {

    // Initialize AOS
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true,    // whether animation should happen only once - while scrolling down
    });

    // --- Smooth Scrolling ---
    // Select all links with hashes (#) in the main navbar
    $('.navbar-nav a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();

                // Calculate offset, considering fixed header height
                var headerHeight = $('header').outerHeight() || 0; // Get header height
                var scrollToPosition = target.offset().top - headerHeight - 10; // Subtract height and a small buffer

                $('html, body').animate({
                    scrollTop: scrollToPosition
                }, 800, function() { // Duration in ms
                    // Optional callback after animation completes
                    // var $target = $(target);
                    // $target.focus();
                    // if ($target.is(":focus")) { // Checking if the target was focused
                    //     return false;
                    // } else {
                    //     $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                    //     $target.focus(); // Set focus again
                    // };
                });

                // Close the mobile navbar menu if it's open
                 if ($('.navbar-toggler').is(':visible')) {
                    $('.navbar-collapse').collapse('hide');
                }
            }
        }
    });


    // --- (Optional but Recommended) Active Link Highlighting on Scroll ---
    // This is a basic version. More robust versions exist.
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        var headerHeight = $('header').outerHeight() || 0;

        // Assign active class to nav links while scrolling
        $('section[id]').each(function(i) {
            if ($(this).position().top - headerHeight - 50 <= scrollDistance) { // Adjusted threshold
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });

         // Special case for top of page
         if (scrollDistance < $('#about').position().top - headerHeight - 50) {
             $('.navbar-nav a.active').removeClass('active');
             $('.navbar-nav a[href="#about"]').addClass('active'); // Highlight 'About' at top
         }

    }).scroll(); // Trigger scroll once on load to set initial state


}); // End of document ready