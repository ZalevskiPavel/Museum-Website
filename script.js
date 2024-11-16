document.addEventListener('DOMContentLoaded', function() {
    //burger
    document.querySelector('.menu_button').addEventListener('click', () => {
        let menu = document.querySelector('.hidden_nav');
        let container = document.querySelector('.grid_container');
        let bars = document.querySelectorAll('.bar');
        let arrayClasses = ["first_bar",  "third_bar", "second_bar"], i = 0;

        menu.classList.toggle('open');
        container.classList.toggle('displ');

        bars.forEach(e => {
            e.classList.toggle(arrayClasses[i]);
            i++;
        });
        i = 0;
    })
    function checkWindowSize() {
        const width = window.innerWidth;
        
        if (width > 992) {
            document.querySelector('.hidden_nav').classList.remove('open');
            document.querySelector('.grid_container').classList.remove('displ');
        }
    }

    window.addEventListener('resize', checkWindowSize);
    
    checkWindowSize();

    //slider events
    let currentSlide = 0;

    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    document.querySelector('.next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide();
    });

    document.querySelector('.prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide();
    });

    function updateSlide() {
        const slidesContainer = document.querySelector('.events-slides');
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    //slider products
    let currentProductSlide = 0;

    const productSlides = document.querySelectorAll('.product_slide');
    const totalProductSlides = productSlides.length;

    const slideWidth = document.querySelector('.product_slide');

    //console.log(slideWidth.offsetWidth)

    document.querySelector('.product_next').addEventListener('click', () => {
        currentProductSlide = (currentProductSlide + 1) % totalProductSlides;
        updateProductSlide();
    });

    document.querySelector('.product_prev').addEventListener('click', () => {
        currentProductSlide = (currentProductSlide - 1 + totalProductSlides) % totalProductSlides;
        updateProductSlide();
    });

    function updateProductSlide() {
        const slidesContainer = document.querySelector('.products_slides');
        slidesContainer.style.transform = `translateX(-${currentProductSlide * (slideWidth.offsetWidth + 30)}px)`;
        //console.log(slideWidth.offsetWidth)
    }
});

/* 480<div class="slider">
        <div class="slides">
            <div class="slide">Слайд 1</div>
            <div class="slide">Слайд 2</div>
            <div class="slide">Слайд 3</div>
        </div>
        <button class="prev">❮</button>
        <button class="next">❯</button>
    </div>
    
.slider {
    position: relative;
    width: 300px;
    height: 200px;
    left: 200px;
    top: 200px;
    border: 1px solid red;
}

.slides {
    display: flex;
    transition: transform 0.5s ease;
}


.slide:hover{
    background: red;
}
    
    */