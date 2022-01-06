window.addEventListener('DOMContentLoaded', () => {


    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    // skrivaet tab(vkladku) i udalyaet class 'tabheader__item_active' kotoriy 
    // delaet shrift sootvetsvueshego razdela jirnim, kotory ukazivaet chto mi v etom razdele.
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }


    //pokazivaet nujniy nam tab i elaet shrift sootvetsvueshego razdela jirnim
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');

    }

    hideTabContent();
    showTabContent();

    // obrobotchik sobitiy kotoriy  pereklyuchaet vkladki pri najati na nih
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });





    //Tamer

    const deadline = '2022-1-8';


    function getTimeRemaining(endtime) {

        // Math.floor() rundet bis zum nächste ganze zahl
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minuts = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor(t / 1000 % 60);

        //return as object
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minuts': minuts,
            'seconds': seconds
        };

    }

    //added zero at the bigin, if the num less than 10
    function getZero(num) {
        return num < 10 ? '0' + num : num;
    }


    function setClock(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minuts = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            //executing method 'updateClock' in each seconds
            timeInterval = setInterval(updateClock, 500);

        //zdes vizivaetsya dlya togo chto bi pri obnovlenie na stranice ne megal 
        //datum kotoriy ustanovlen v html faile
        updateClock();


        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minuts.innerHTML = getZero(t.minuts);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);



    //Modal Windows

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');


    function openModal() {
        modal.classList.toggle('show');
        //ne daet saitu skrollit vverh ili vniz posle togo kak otkrivaetsya modalnoe okno
        document.body.style.overflow = 'hidden';
        //if user alraady seen modal window, than don't show more
        clearInterval(timeId);
    }

    //perebiraem psevdomassiv 'modalTrigger'
    modalTrigger.forEach((item) => {
        item.addEventListener('click', openModal);
    });


    function closeModal() {
        modal.classList.toggle('show');
        //scrolling is able again, after closing modal window
        document.body.style = '';
    }

    //close modal window with click on 'modalCloseBtn'
    modalCloseBtn.addEventListener('click', closeModal);

    //close modal window by click anywhere except modal window
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    //close modal window after pressing Escape key, if it was open
    document.addEventListener("keydown", (e) => {
        if (e.code === 'Escape' && modal.classList.contains("show")) {
            closeModal();
        }
    });


    // const timeId = setTimeout(openModal, 5000);


    //show modal window if user has scrolled to end
    function showModalByScroll() {
        //window.pageYOffset - return visotu togo promejutka kotoriy user prokrutil po Y-achse
        //document.documentElement.clientHeight - returns the height, that user see on screen at the moment 
        //document.documentElement.scrollHeight - returns the full height from document
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            //udalyaet etot obrabotchik sobitiy posle togo kak user dolistaet stranicu do konca
            //i ne pokajet modal window povtorno
            window.removeEventListener('scroll', showModalByScroll);
        }
    }


    window.addEventListener('scroll', showModalByScroll);




    // Menu card

    //adding menu cards
    class MunuCard {
        //...classes eto-REST param(massiv) parametrov kotoriy mojet soderjat 0 ili bolshe parametrov
        constructor(title, price, descr, src, alt, parentSelector, ...classes) {
            this.title = title;
            this.price = price;
            this.descr = descr;
            this.classes = classes;
            this.src = src;
            this.alt = alt;
            this.parentSelector = document.querySelector(parentSelector);
            this.changeEuroToUAH();

        }

        changeEuroToUAH() {
            this.price = this.price * 27;
        }

        addMenuCard() {

            const menuElement = document.createElement('div');
     //esli v classes budet pustim, to togda po umolchaniyu v nego budet zapisan 'menu_item'
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                menuElement.classList.add(this.classes);
            } else {
    //dobavlyaet elementi(classi) massiva 'classes' v menuElement
                this.classes.forEach(item => menuElement.classList.add(item));
            }

            menuElement.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
                   

            this.parentSelector.append(menuElement);

        }


    }

    let descr = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';

    new MunuCard(
        "Фитнес",
        120,
        descr,
        "img/tabs/vegy.jpg",
        'vegy',
        '.menu .container',        
    ).addMenuCard();
































});