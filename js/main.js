$(document).ready(function () {


/****** LOAD PAGES *******/

var loadPages = function (callback) {
    $('#cardiocare-o-nas').load('cardiocare-o-nas.html');
    $('#badania-kierowcow-krakow').load('badania-kierowcow-krakow.html');
    $('#badania-na-bron-krakow').load('badania-na-bron-krakow.html');
    $('#dzialalnosc-badawczo-rozwojowa-krakow').load('dzialalnosc-badawczo-rozwojowa-krakow.html');
    $('#cardiocare-kontakt-krakow').load('cardiocare-kontakt-krakow.html');

    if (callback) {
        callback();
    };
};

loadPages();
    

/*
$('header, #content').on('click', 'a', function (e) {
    e.preventDefault();

        var podstrona = $(this).attr('href');

      //  var podstronaLength = podstrona.length;
      //  var url = podstrona.slice(0, podstronaLength - 5);

        var currentURL = window.location.href;


        if (podstrona === '#dzialalnosc-badawczo-rozwojowa') {
            $('#content').load(podstrona, function () {
                //$('header, footer').addClass('badania_page');

                scrollTo(e);
            });
        } else {

            if (currentURL.search('dzialalnosc-badawczo-rozwojowa') !== -1) {

                $('#content').load('index.html #content > *', function () {
                    loadPages(function () {
                        $('header, footer').removeClass('badania_page');


                        //  var scrollY = $(window).scrollTop();
                        //    console.log('window: ', scrollY);
                        scrollTo(e);
                    });
                });
            } else {
                scrollTo(e);
            }
        };

    switch_nav_active(window.location.href);

    return false;
});
};

*/
$(function () {

    
/**** RELOAD PAGES ****/

function reloadPages() {
    
    $('header, #content').on('click', 'a.link', function (e) {
        
        var link = $(this).attr('href');
        var currentURL = window.location.href;
        var target = e.target;
       
        
        if ( link === '#dzialalnosc-badawczo-rozwojowa') {

            $('#content').load('dzialalnosc-badawczo-rozwojowa.html', function(){
                scrollTo(target);
            });

        } else {
             console.log(currentURL);
            if (currentURL.search('#dzialalnosc-badawczo-rozwojowa') !== -1) {
               
                $('#content').load('index.html #content > *', function () {
                    loadPages(function () {
                        $(document).ready(function(){
                        scrollTo(target);
                            });
                    });
                });
            } else {
                scrollTo(target);
            };
        };
    });
};
    
    reloadPages();


/****************************
    **SCROLL_TO**
*****************************/


    function scrollTo(navLink) {


        if (location.pathname.replace(/^\//, '') === navLink.pathname.replace(/^\//, '') && location.hostname === navLink.hostname) {

            var target = navLink.hash;
            var idDiv = $(navLink.hash);


            var navBurger = $('#burger_nav');
            var heightNav = $('nav ul').css('height');

            if (navBurger.hasClass('active') == true) {
                heightNav = parseInt(heightNav) + 30;
            } else {
                heightNav = parseInt(heightNav)
            };

            var divTop = idDiv.offset().top;
            console.log(divTop);
            scrollPosition = divTop - heightNav;

            if (idDiv.length) {
                $('html, body').animate({
                    scrollTop: scrollPosition,
                }, 1000);
                return false;
            };

        };  
    };                  
});
    


/************************************
 ********SWITCH NAV+URL CURRENT*******
 *************************************/

$(document).ready(function () {

    var navLinks = $('a.link');

    var currentScroll = 0;
    var divTop;

    var currentURL = '';
    $(window).scroll(function () {


        $(navLinks).each(function () {

            var divLink = $(this).attr('href');

            if ($(divLink).length) {
                divTop = $(divLink).offset().top; 
            }

            var scrollY = $(window).scrollTop();
            //console.log(scrollY);
            var distance = Math.abs(scrollY - divTop);
            //console.log(distance);


            if ((distance < 60 || scrollY + $(window).height() == $(document).height) && divLink != currentURL) {
                currentURL = divLink;
                $('nav ul li').removeClass('current');
                $(this).parent().addClass('current');
                history.pushState(null, null, currentURL);
            };
        });
    });
});



/**** SWITCH NAV CURRENT ****

var switch_nav_active = function (pathname) {
    $('header nav ul > li').removeClass('current');
    var $currentItem = $("");
    //console.log('path: ', pathname);
    $('header nav ul > li').each(function () {
        var link_length = $(this).length;
        var url = $(this).find("a").attr("href").slice(0, link_length - 6);
        // console.log('url: ', url);
        if (pathname.search(url) !== -1)
            $currentItem = $(this);
    });
    // console.log($currentItem);
    $currentItem.addClass('current');
};




/**** SCROLL CHANGE URL ****

$(document).scroll(function () {
    var currentURL = '';
    var scrollY = $(window).scrollTop();

     if (scrollY == 0) {
            currentURL = entryURL;
            history.pushState(null, null, currentURL);
            $('header nav ul > li').each(function () {
                $(this).removeClass('current');
            });
        };

    $('div.bar').each(function () {
        var distance = scrollY - $(this).offset().top;
        var url = $(this).attr('data-link');


        if (distance < 50 && distance > -50 && currentURL != url) {
            currentURL = url;
            history.pushState(null, null, currentURL);
            switch_nav_active(currentURL);
        };
    });
});




/**SCROLL_TO**

var scrollTo = function (event) {

    if (event.target.dataset.action === 'top') {
        scrollPosition = 0;

        $('header nav ul > li').each(function () {
            $(this).removeClass('current');
        });

    } else {
        var navBurger = $('#burger_nav');
        var heightNav = $('nav ul').css('height');

        if (navBurger.hasClass('active') == true) {
            heightNav = parseInt(heightNav) + 20;
        } else {
            heightNav = parseInt(heightNav) - 2;
        };

        var link = event.target.dataset.action;

        var div = $('#' + link).offset();
        var divTop = div.top;

        //   console.log('divTop:', link, divTop);

        var scrollPosition = divTop - heightNav;

    }
    $('html, body').animate({
        scrollTop: scrollPosition
    }, 700);
};



/*****************STICKY NAV****************/

var stickyNav = function () {
    var scrollY = $(window).scrollTop();
    if (scrollY > 0) {
        $('nav').addClass('sticky')
    } else {
        $('nav').removeClass('sticky');
    }
};

stickyNav();

var fadeScrollTopButton = function () {
    if ($(this).scrollTop() > 300)
        $('.home').fadeIn();
    else $('.home').fadeOut(10);
};


/***BURGER_NAV***/

var menuButton = document.getElementById('burger_nav');

menuButton.addEventListener('click', openMenu);

function openMenu() {
    var menu = document.querySelector('header nav ul');
    menu.classList.toggle('open');
    menuButton.classList.toggle('active');
}

$('.home').click(scrollTo);

$(window).scroll(function () {
    stickyNav();
    fadeScrollTopButton();
});


/*******READ MORE ARTICLES********/

$('#content').on('click', '.article_btn', function () {

    var moreArticle = $(this).parent().find('.read_more');

    moreArticle.toggleClass('full_article');

    var divHeight = moreArticle.height();


    if ($(moreArticle).hasClass('full_article')) {
        $(this).text('Czytaj mniej..');
    } else {
        $(this).text('Czytaj więcej..');

        if ($(window).width() <= 640) {
            var offsetTop = $(document).scrollTop();

            $('html, body').animate({
                scrollTop: offsetTop - divHeight
            }, 700);
        };
    };

});

});



/****FORMULARZ*****/


const form = document.querySelector('#contactForm');
const inputs = form.querySelectorAll('input[required], textarea[required]');

form.setAttribute('novalidate', true);

const displayFieldError = function (elem) {
const fieldRow = elem.closest('.form-row');
const fieldError = fieldRow.querySelector('.field-error');

if (fieldError === null) {
    const errorText = elem.dataset.error;
    const divError = document.createElement('div');
    divError.classList.add('field-error');
    divError.innerText = errorText;
    fieldRow.appendChild(divError);
}
};

const hideFieldError = function (elem) {
const fieldRow = elem.closest('.form-row');
const fieldError = fieldRow.querySelector('.field-error');

if (fieldError !== null) {
    fieldError.remove();
}
};

[...inputs].forEach(elem => {
elem.addEventListener('input', function () {
    if (!this.checkValidity()) {
        this.classList.add('error');
    } else {
        this.classList.remove('error');
        hideFieldError(this);
    }
});
});

const checkFieldsError = function (elements) {
let fieldsAreValid = true;

[...elements].forEach(elem => {
    if (elem.checkValidity()) {
        hideFieldError(elem);
        elem.classList.remove('error');
    } else {
        displayFieldError(elem);
        elem.classList.add('error');
        fieldsAreValid = false;
    }
});

return fieldsAreValid;
};

form.addEventListener('submit', e => {
e.preventDefault();

if (checkFieldsError(inputs)) {
    const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled)');

    const dataToSend = new FormData();
    [...elements].forEach(el => dataToSend.append(el.name, el.value));

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.classList.add('element-is-busy');

    const url = form.getAttribute('action');
    const method = form.getAttribute('method');


    fetch(url, {
            method: method.toUpperCase(),
            body: dataToSend
        })
        .then(ret => ret.json())
        .then(ret => {
            submit.disabled = false;
            submit.classList.remove('element-is-busy');

            if (ret.errors) {
                ret.errors.map(function (el) {
                    return '[name="' + el + '"]'
                });

                const badFields = form.querySelectorAll(ret.errors.join(','));
                checkFieldsErrors(badFields);
            } else {

                if (ret.status === 'ok') {
                    const div = document.createElement('div');
                    div.classList.add('form-send-success');
                    div.innerText = 'Wysłanie wiadomości powiodło się';

                    form.parentElement.insertBefore(div, form);
                    div.innerHTML = '<strong>Wiadomość została wysłana</strong><span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>';
                    form.remove();
                }

                if (ret.status === 'error') {

                    if (document.querySelector('.send-error')) {
                        document.querySelector('.send-error').remove();
                    }
                    const div = document.createElement('div');
                    div.classList.add('send-error');
                    div.innerText = 'Wysłanie wiadomości się nie powiodło';
                    submit.parentElement.appendChild(div);
                }
            }

        }).catch(_ => {
            submit.disabled = false;
            submit.classList.remove('element-is-busy');
        });
}
});
