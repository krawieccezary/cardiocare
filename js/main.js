$(document).ready(function () {
    /*****************STICKY NAV****************/
    var NavY = $('.nav').offset().top;
    var stickyNav = function () {
        var ScrollY = $(window).scrollTop();

        if (ScrollY > NavY) {
            $('.nav').addClass('sticky');

        } else {
            $('.nav').removeClass('sticky');
        }
    };

    var fadeScrollTop = function () {
        if ($(this).scrollTop() > 300)
            $('.home').fadeIn();
        else $('.home').fadeOut(10);
    };

    stickyNav();

    /**SCROLL_TO**/

    $('.nav').on('click', function (event) {
        if (event.target.dataset.action === 'top')
            scrollPosition = 0;
        else {
            var heightNav = $('.nav').css('height');
            var link = event.target.dataset.action;
            /* var heightNavNumber = parseInt(heightNav); */
            var div = $('#' + link);
            var divTop = div.offset().top;
            var scrollPosition = divTop - parseInt(heightNav);
        }
        $('html, body').animate({
            scrollTop: scrollPosition
        }, 1000)
    });

    $(window).scroll(function () {
        stickyNav();
        fadeScrollTop();
    });


    /***BURGER_NAV***/


    var menuButton = document.getElementById('burger_nav');

    menuButton.addEventListener('click', openMenu);

    function openMenu() {
    
        var menu = document.querySelector('header nav ul');
        menu.classList.toggle('open');
        menuButton.classList.toggle('active');
    }


});
