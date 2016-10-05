//jQuery to collapse the navbar on scroll
$(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//Superslides 
$('#slides').superslides({
    slide_easing: 'easeInOutCubic',
    slide_speed: 800,
    pagination: true,
    hashchange: false,
    scrollable: true,
    animation: 'fade'
});


// Banner text add parallax efect and fade
function EasyPeasyParallax() {
    scrollPos = $(this).scrollTop();
    $('#slider').css({
        'background-position': '50% ' + (-scrollPos / 4) + "px"
    });
    $('#bannertext').css({
        'margin-top': (scrollPos / 4) + "px",
        'opacity': 1 - (scrollPos / 250)
    });
}
$(document).ready(function () {
    $(window).scroll(function () {
        EasyPeasyParallax();
    });
});

// Change Navbar background color after scroll
$(function () {
    var targets = $(".navbar");
    if ($(window).scrollTop() > 200) {
        // targets.hide();
    }
    $(window).scroll(function () {
        var pos = $(window).scrollTop();
        if (pos > 200) {
            $(".navbar").removeClass("navbar-default").addClass("navbar-inverse");
        }
        if (pos < 50) {
            $(".navbar").removeClass("navbar-inverse").addClass("navbar-default");
        }
    });

});


//Portfolio:Please check docs for more info
(function ($, window, document, undefined) {

    var gridContainer = $('#grid-container'),
        filtersContainer = $('#filters-container');

    // init cubeportfolio
    gridContainer.cubeportfolio({

        defaultFilter: '*',

        animationType: 'rotateRoom',

        gapHorizontal: 0,

        gapVertical: 0,

        gridAdjustment: 'responsive',

        caption: 'overlayBottomAlong',

        displayType: 'bottomToTop',

        displayTypeSpeed: 100,

        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxShowCounter: true,


        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: true,
        singlePageShowCounter: true,
        singlePageCallback: function (url, element) {

            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;

            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 5000
            })
                .done(function (result) {
                    t.updateSinglePage(result);
                })
                .fail(function () {
                    t.updateSinglePage("Error! Please refresh the page!");
                });
        },

    });

    // add listener for filters click
    filtersContainer.on('click', '.cbp-filter-item', function (e) {

        var me = $(this),
            wrap;

        // get cubeportfolio data and check if is still animating (reposition) the items.
        if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {

            if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
                wrap = $('.cbp-l-filters-dropdownWrap');

                wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

                wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

                me.addClass('cbp-filter-item-active');
            } else {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            }

        }

        // filter the items
        gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

    });

    // activate counter for filters
    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));

})(jQuery, window, document);


//About us,member grid with ajax 
jQuery('#grid-members').cubeportfolio({
    // place here the options. Don't forget to separate them by comma
    gridAdjustment: 'responsive',
    gapHorizontal: 0,
    gapVertical: 0,
    caption: 'overlayBottomAlong',

    // singlePage popup
    singlePageDelegate: '.cbp-singlePage',
    singlePageDeeplinking: true,
    singlePageStickyNavigation: true,
    singlePageShowCounter: true,
    singlePageCallback: function (url, element) {

        // to update singlePage content use the following method: this.updateSinglePage(yourContent)
        var t = this;

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'html',
            timeout: 5000
        })
            .done(function (result) {
                t.updateSinglePage(result);
            })
            .fail(function () {
                t.updateSinglePage("Error! Please refresh the page!");
            });
    },
});


// activate all tooltips
jQuery('[data-toggle~="tooltip"]').tooltip({
    container: 'body'
});

// activate all popovers
jQuery('[data-toggle~="popover"]').popover({
    container: 'body'
});

// If mobile screens make accordion links
$("#footer h4").click(function () {
    $screensize = $(window).width();
    if ($screensize < 801) {
        $(this).toggleClass("active");
        $(this).parent().find("ul").slideToggle('medium');
    }
});



jQuery('#contactform').submit(function () {

var action = $(this).attr('action');

jQuery("#message").slideUp(750, function () {
    jQuery('#message').hide();

    jQuery.post(action, {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            subject: $('#subject').val(),
            comments: $('#comments').val()
        },
        function (data) {
            document.getElementById('message').innerHTML = data;
            $('#message').slideDown('slow');
            if (data.match('success') != null) $('#contactform').slideUp('slow');

        }
    );

});

return false;

});

