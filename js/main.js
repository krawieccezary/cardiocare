$(document).ready(function () {

    /****** LOAD PAGE *******/

    $('#content').load('pages/home.html');


    $('header, #content').on('click', 'a', function (e) {
        var podstrona = $(this).attr('href');
       
        $('#content').load('pages/' + podstrona, function () {
            if (podstrona === 'badania.html') {
                $('header, footer').addClass('badania_page');
            } else {
                $('header, footer').removeClass('badania_page');
            }

            scrollTo(e);
        });
        return false;

    });


    /*******READ MORE********/



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
                },700);
            };
        };

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



    /**SCROLL_TO**/

    var scrollTo = function (event) {

        if (event.target.dataset.action === 'top') {
            scrollPosition = 0;
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

            var scrollPosition = divTop - heightNav;
            
        }
        $('html, body').animate({
            scrollTop: scrollPosition
        }, 700);
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
        
        console.log(url);

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
