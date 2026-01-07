// Carousel - Controle de slides
let currentSlideIndex = 1;

// Mostrar slide específico
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

// Navegar para próximo ou anterior
function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}

// Exibir o slide especificado
function showSlide(n) {
    const items = document.getElementsByClassName('carousel-item');
    const dots = document.getElementsByClassName('dot');

    // Se n é maior que o total de slides, volta ao primeiro
    if (n > items.length) {
        currentSlideIndex = 1;
    }

    // Se n é menor que 1, vai para o último slide
    if (n < 1) {
        currentSlideIndex = items.length;
    }

    // Remove classe 'active' de todos os items e dots
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    // Adiciona classe 'active' ao item e dot atual
    items[currentSlideIndex - 1].classList.add('active');
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

// Inicializar mostrando o primeiro slide
showSlide(currentSlideIndex);