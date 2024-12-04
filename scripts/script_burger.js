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
});