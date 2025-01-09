'use strict';

// Función para abrir el cliente de correo
function openEmail () {
    const email = 'mariabegueri@hotmail.es';
    const subject = 'New Contact Form Submission';
    const body = 'Hello,\n\nPlease enter your message here.\n\nBest regards,';
    window.location.href = `mailto:${ email }?subject=${ encodeURIComponent( subject ) }&body=${ encodeURIComponent( body ) }`;
}

// Ejecuta el código cuando el DOM está listo
document.addEventListener( 'DOMContentLoaded', () => {
    const words = document.querySelectorAll( '.word' );
    words.forEach( word => {
        word.innerHTML = word.textContent.split( '' ).map( letter => `<span class="letter">${ letter }</span>` ).join( '' );
    } );

    // Cambia las palabras cada 3 segundos
    let currentWordIndex = 0;
    const maxWordIndex = words.length - 1;
    words[ currentWordIndex ].style.opacity = '1';

    const changeText = () => {
        const currentWord = words[ currentWordIndex ];
        const nextWord = currentWordIndex === maxWordIndex ? words[ 0 ] : words[ currentWordIndex + 1 ];

        currentWord.querySelectorAll( '.letter' ).forEach( ( letter, i ) => {
            setTimeout( () => {
                letter.className = 'letter out';
            }, i * 80 );
        } );

        nextWord.style.opacity = '1';
        nextWord.querySelectorAll( '.letter' ).forEach( ( letter, i ) => {
            letter.className = 'letter behind';
            setTimeout( () => {
                letter.className = 'letter in';
            }, 340 + i * 80 );
        } );

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval( changeText, 3000 );

    // Circle skills
    document.querySelectorAll( '.circle' ).forEach( elem => {
        const dots = +elem.getAttribute( 'data-dots' );
        const marked = +elem.getAttribute( 'data-percent' );
        const percent = Math.floor( dots * marked / 100 );
        const rotate = 360 / dots;

        elem.innerHTML = Array.from( { length: dots }, ( _, i ) => `<div class="points" style="--i:${ i }; --rot:${ rotate }deg"></div>` ).join( '' );

        const points = elem.querySelectorAll( '.points' );
        points.forEach( ( point, i ) => {
            setTimeout( () => {
                if ( i < percent ) point.classList.add( 'marked' );
            }, i * 50 );
        } );
    } );

    // Active menu
    const menuLi = document.querySelectorAll( 'header ul li a' );
    const sections = document.querySelectorAll( 'section' );

    const activeMenu = () => {
        let len = sections.length;
        while ( --len && window.scrollY + 97 < sections[ len ].offsetTop ) { }
        menuLi.forEach( sec => sec.classList.remove( 'active' ) );
        menuLi[ len ].classList.add( 'active' );
    };

    activeMenu();
    window.addEventListener( 'scroll', activeMenu );

    // Pointer animation
    const h1 = document.querySelector( '.home-content h1' );
    const pointer = document.createElement( 'span' );
    pointer.className = 'pointer';
    pointer.textContent = '|';
    h1.insertBefore( pointer, h1.firstChild );

    setInterval( () => {
        pointer.style.opacity = pointer.style.opacity === '0' ? '1' : '0';
    }, 500 );

    // Floating cards
    const serviceDescriptions = {
        'receptionist': 'As a seasoned receptionist with over 15 years of experience, I excel in managing front desk operations, handling reservations, and providing exceptional customer service. My background includes working with leading companies such as SIXT and Europcar, where I honed my skills in multitasking, problem-solving, and maintaining a welcoming environment for clients.',
        'administrative': 'With extensive experience in administrative roles, I am adept at managing office tasks, coordinating schedules, and ensuring smooth operations. My proficiency in tools like Office 365, Trello, and MasterYield allows me to optimize processes and support the administrative needs of any organization efficiently.',
        'personal-assistant': 'As a personal assistant, I bring a high level of organization and attention to detail to support executives and professionals. My experience includes managing calendars, arranging travel, and handling confidential information with discretion. I am committed to providing reliable and proactive assistance to help you achieve your goals.',
        'language-translator': 'Fluent in English, German, Spanish, Catalan, and French, I offer professional language translation services to bridge communication gaps and facilitate international interactions. My expertise in translation ensures accurate and culturally sensitive communication, whether for business, travel, or personal needs.'
    };

    const readMoreButtons = document.querySelectorAll( '.read-more' );
    const serviceCard = document.getElementById( 'service-card' );
    const serviceTitle = document.getElementById( 'service-title' );
    const serviceDescription = document.getElementById( 'service-description' );
    const closeBtn = document.querySelector( '.close-btn' );

    readMoreButtons.forEach( button => {
        button.addEventListener( 'click', ( e ) => {
            e.preventDefault();
            const service = button.getAttribute( 'data-service' );
            serviceTitle.textContent = button.parentElement.previousElementSibling.textContent;
            serviceDescription.textContent = serviceDescriptions[ service ];
            serviceCard.style.display = 'block';
        } );
    } );

    closeBtn.addEventListener( 'click', () => {
        serviceCard.style.display = 'none';
    } );

    // Menu toggle
    const menuIcon = document.getElementById( 'menu-icon' );
    const navList = document.querySelector( '.navlist' );

    menuIcon.addEventListener( 'click', () => {
        navList.classList.toggle( 'active' );
    } );

    // Asigna la función al botón de "Send Message"
    const sendMessageButton = document.querySelector( '.formBtn .btn' );
    sendMessageButton.addEventListener( 'click', openEmail );
} );
