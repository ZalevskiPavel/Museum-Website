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
    const slidesContainer = document.querySelector('.slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

/* <div class="slider">
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

.slide {
    min-width: 100%;
    height: 180px;
    box-sizing: border-box;
    padding: 20px;
    background: lightgray;
    text-align: center;
}
.slide:hover{
    background: red;
}
    
    */