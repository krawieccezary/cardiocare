$(document).ready(function () {

/****** LOAD PAGES *******/

var loadPages = function (callback) {

    $('#cardiocare-o-nas').load('cardiocare-o-nas.php');
    $('#badania-kierowcow-krakow').load('badania-kierowcow-krakow.html');
    $('#badania-na-bron-krakow').load('badania-na-bron-krakow.html');
    $('#dzialalnosc-badawczo-rozwojowa').load('dzialalnosc-badawczo-rozwojowa.html');
    $('#cardiocare-kontakt-krakow').load('cardiocare-kontakt-krakow.html');

    if (callback) {
        callback();
    };
};

loadPages();
    

$(function () {

    
/**** RELOAD PAGES ****/

function reloadPages() {

    
    $('header, #content').on('click', 'a.link', function (e) {
        e.preventDefault();
        
        var link = $(this).attr('href');
        var currentURL = window.location.href;
        var target = e.target;
        
        var idDiv = link.slice(0, link.length-5)
        var div = $('#' + idDiv);
       console.log(target);
        
        if ( link === 'dzialalnosc-badawczo-rozwojowa-krakow.html') {

            $('#content').load('dzialalnosc-badawczo-rozwojowa-krakow.html', function(){
                scrollTo(target);
                $('a.badania').attr('href', 'dzialalnosc-badawczo-rozwojowa-krakow.html');
            });

        } else {
                
                if (div) {
                    console.log('yess');
                    scrollTo(target);
                }
               
                else {
                    console.log(div);
                    console.log('nooo');
                    $('#content').load('index.html #content > *', function () {

                        loadPages(function () {
                            $('a.badania').attr('href', 'dzialalnosc-badawczo-rozwojowa.html');
                            $(document).scrollTop(0);
                            $(document).ready(function(){
                            scrollTo(target);
                                });
                        });
                    });
                };
        };
    
    });
};
    
    reloadPages();
    

    
    
    /****************************
        **SCROLL_TO**
 *****************************/


    var checkClick = false;

     function scrollTo(navLink) {
         
     //    console.log(navLink);
       //  console.log(location.hostname);
    //     console.log(navLink.pathname.replace(/^\//, ''));

        if (location.hostname === navLink.hostname) {
            
            var link = navLink;
            checkClick = true;
            switchNav(checkClick, link);

            var linkHref = $(navLink).attr('href');
            var idDiv = linkHref.slice(0, linkHref.length-5)
            var div = $('#' + idDiv);
            console.log(div);
            var navBurger = $('#burger_nav');
            var heightNav = $('nav ul').css('height');

            if (navBurger.hasClass('active') == true) {
                heightNav = parseInt(heightNav) + 30;
            } else {
                heightNav = parseInt(heightNav)
            };

            var divTop = div.offset().top;
          //  console.log(divTop);
            scrollPosition = divTop - heightNav;

            if (idDiv.length) {
                $('html, body').animate({
                    scrollTop: scrollPosition,
                }, 800, function () {
                    checkClick = false;
                });
            };
        };
    };

                           

    /************************************
     ********SWITCH NAV+URL CURRENT*******
     *************************************/

    function switchNav(checkClick, link) {

        var navLinks = $('nav a.link');
   //     console.log(navLinks);
        var divTop;
        var currentURL = '';

        if (checkClick) {
            
            currentURL = $(link).attr('href');
            history.pushState(currentURL, null, currentURL);
            $('nav ul li').removeClass('current');
            if ($(link).hasClass('badania_link')) {
                $('a.badania').parent().addClass('current');
            }
            else {
            $(link).parent().addClass('current');
            }
            
        } else {

            $(navLinks).each(function () {

                var divLink = $(this).attr('href');
                
                var idDiv = divLink.slice(0, divLink.length-5);
               // console.log(idDiv);
                
                var div = $('#' + idDiv);

               if (divLink.length) {
                    divTop = $(div).offset().top;
                }

                    var scrollY = $(window).scrollTop();
                    var distance = Math.abs(scrollY - divTop);
                    var endScrollY = $(window).height();
                    var hash = location.href;
                
                    if (hash.search('dzialalnosc-badawczo-rozwojowa-krakow') !== -1) {
                        $('a.badania').parent().addClass('current');
                    }
                
                    else {

                        if (distance < 70 && hash.search(currentURL) === 0) {

                           // console.log(hash.search(currentURL));
                          //  console.log(hash);
                          //  console.log(divLink);
                            currentURL = divLink;
                            $('nav ul li').removeClass('current');
                            $(this).parent().addClass('current');
                            history.pushState(null, null, currentURL);
                            
                        };
                }; 

            });
        };
    };

    $(window).scroll(function () {
        if (!checkClick) {
            switchNav(checkClick);
        };
    });
    
    
    $(window).on('popstate', function (e) {
    var state = e.originalEvent.state;
    if (state !== null) {
        //load content with ajax
        loadPages();
    }
});
});
    




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
