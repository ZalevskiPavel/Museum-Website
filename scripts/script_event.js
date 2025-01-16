document.addEventListener("DOMContentLoaded", () => {
    function dataTransfer() {
        const id = localStorage.getItem('id');

        if(id) {
            sessionStorage.setItem('id', id);
        }

        localStorage.clear();
    }

    function dataConverter(originalDate) {
        const date = new Date(originalDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return  `${day}.${month}.${year}`;
    }

    function splitTextIntoGroups(text) {
        let sentences = text.split(/(?<=\.)\s+/);
        
        let groups = [];
        for (let i = 0; i < sentences.length; i += 3) {
            groups.push(sentences.slice(i, i + 3).join(' '));  
        }
        
        return groups;
    
    }
    function bookButtonShowPopup(data){
        const button = document.getElementById('book_button');
        const popUp = document.getElementById('pop_up');
        const blackout = document.querySelector('.blackout');
        const closePopUp = document.getElementById('close');

        button.style.display = 'flex';

        button.addEventListener('click', () => {
            popUp.style.display = "flex";
            blackout.style.display = "block";

            setTimeout(() => {
                popUp.style.transform = "translateX(-50%) translateY(-50%)";
            }, 50)
        })
        
        blackout.addEventListener("click", () => {
            popUp.style.transform = "translateY(100%) translate(-50%)";
            blackout.style.display = "none";

            setTimeout(() => {  
                popUp.style.display = "none";
            },  750)
        })

        closePopUp.addEventListener('click', () => {
            popUp.style.transform = "translateY(100%) translate(-50%)";
            blackout.style.display = "none";

            setTimeout(() => {  
                popUp.style.display = "none";
            }, 750)
        })
    }
    
    async function pageFilling() {
        //const id_here = document.querySelector(".id_here");
        const idGet = sessionStorage.getItem('id');

        //id_here.textContent = idGet;
        try {
            const response = await fetch('http://localhost:3000/api/exhibitions_and_events');
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
            const data = await response.json();  
            
            document.body.style.backgroundImage =  `url('../src/event_full_pictures/image_0${data[idGet-1].full_picture}.webp')`;
            document.title = data[idGet - 1].name;

            const names = document.querySelectorAll('.event_name');
            const eventType = document.getElementById('event_type');
            const durations = document.querySelectorAll('.event_duration');
            const intro = document.getElementById('intro');
            const description = document.getElementById('description');
            const dailyTime = document.getElementById('time');
            const price = document.getElementById('price');
            const splittedText = splitTextIntoGroups(data[idGet - 1].description);

            
            eventType.textContent = data[idGet - 1].e_type;
            intro.textContent = data[idGet - 1].introduction;
            dailyTime.textContent = `Daily:  ${data[idGet - 1].e_start_time} - ${data[idGet - 1].e_end_time}`
            
            if(data[idGet - 1].price != 0) {
                price.textContent = `Ticket price: ${data[idGet - 1].price }$`;
                bookButtonShowPopup(data);
            } else {
                price.textContent = `Free`;
            }

            names.forEach(name => {
                name.textContent = data[idGet - 1].name;
            });

            durations.forEach(duration => {
                if(dataConverter(data[idGet - 1].e_start_date) == dataConverter(data[idGet - 1].e_end_date)){
                    duration.textContent = dataConverter(data[idGet - 1].e_start_date);
                } else {
                    duration.textContent = `${dataConverter(data[idGet - 1].e_start_date)} - ${dataConverter(data[idGet - 1].e_end_date)}`
                }
            })

            splittedText.forEach(sentences => {
                const p = document.createElement('p');

                p.textContent = sentences;

                description.appendChild(p);
            });
          
        } catch (error) {
            console.error('Ошибка:', error);
        }

    }

    window.onload = () => {
        dataTransfer();
        pageFilling();
    }

})