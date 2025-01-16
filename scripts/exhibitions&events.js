document.addEventListener("DOMContentLoaded", function() {
    const inputDate = document.getElementById('input_date');
    const targetAudienceCriteria = document.querySelectorAll('.target_criteria');
    const typeOfEventCriteria = document.querySelectorAll('.type_criteria');
    const today = document.getElementById('today_button');
    const tomorrow = document.getElementById('tomorrow_button');
    const listHeaders = document.querySelectorAll('.list_header');
    
    let targetAud = "", typeOfEv = "", dateOfEvent = "", amountOfColumns;

    //Tiles
    function checkWindowSize() {
        const width = window.innerWidth;
        
        if(width >= 1200){
            amountOfColumns = 3;
            
        } else if (width >= 768) {
            amountOfColumns = 2;
        } else amountOfColumns = 1;
        spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
    }


    function dataConverter(originalDate) {
        const date = new Date(originalDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return  `${day}.${month}.${year}`;
    }

    function tileContentLoader(data, container){

        if (!data || !data.e_type) {
            console.error('Ошибка: данные события некорректны или отсутствуют');
            console.log(data);
            return; // Прерываем выполнение функции, если данные некорректны
        }
        
        const tile = document.createElement('div');
        const img = document.createElement('img');
        const description = document.createElement('a');
        const typeOfEvent = document.createElement('p');
        const eventName = document.createElement('h3');
        const eventStartDateAndTime = document.createElement('p');
        const intro = document.createElement('p');
        const target = document.createElement('p');

        tile.classList.add('tile');
        description.classList.add('tile_description');
        eventStartDateAndTime.classList.add('tile_date');
        intro.classList.add('tile_intro');
        
        description.href = "event_page.html";
        
        description.addEventListener("mousedown", () => {
            localStorage.setItem('id', data.id);
            
        })

        typeOfEvent.textContent = data.e_type;
        eventName.textContent = data.name;
        eventStartDateAndTime.textContent = `Starts on: ${dataConverter(data.e_start_date)}, ${data.e_start_time}`;
        intro.textContent = data.introduction;
        target.textContent = data.target_visitors;

        description.appendChild(typeOfEvent);
        description.appendChild(eventName);
        description.appendChild(eventStartDateAndTime);
        description.appendChild(intro);
        description.appendChild(target)

        img.src = `src/photo-waterfall/Image 0${data.small_picture}.png`;

        tile.appendChild(img);
        tile.appendChild(description);
        container.appendChild(tile);  
    }

    function noResult(){
        const space = document.getElementById('space');
        const message = document.createElement('p');

        message.classList.add('bad_news');
        message.textContent = "No results";

        space.appendChild(message);
    }

    async function spaceLoader(numberOfColumns, targetAud, typeOfEv, dateOfEvent) {
        try {
            const response = await fetch('http://localhost:3000/api/exhibitions_and_events');
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
            const data = await response.json();  
            const space = document.getElementById('space');

            let arr = [], 
            generalAmountOfTales = data.length, 
            setOfTypes = new Set(), 
            setOfAud = new Set(), 
            setOfDates = new Set(),
            amountOfTalesInColumn = 0, 
            counter = 0, 
            counterA = 0;

            if(typeOfEv){
                data.forEach(e => {
                    if(e.e_type == typeOfEv){
                        setOfTypes.add(e.id);
                    }
                })
                arr.push(setOfTypes);
            }
            if(targetAud){
                data.forEach(e => {
                    if(e.target_visitors == targetAud){
                        setOfAud.add(e.id);
                    }
                })
                arr.push(setOfAud);
            }
            if(dateOfEvent){
                data.forEach(e => {
                    if(dataConverter(e.e_start_date) == dataConverter(dateOfEvent)){
                        setOfDates.add(e.id);
                    }
                })
                arr.push(setOfDates);
            }

            if(typeOfEv || targetAud || dateOfEvent){
                arr = arr.reduce((acc, set) => {
                    return [...acc].filter(x => set.has(x));
                }, arr[0]);
                generalAmountOfTales = arr.length;
            }

            space.innerHTML = '';
            if(generalAmountOfTales == 0){
                noResult();
                return;
            }

            if(generalAmountOfTales % numberOfColumns == 0){
                amountOfTalesInColumn = parseInt(generalAmountOfTales / numberOfColumns);
            } else {
                amountOfTalesInColumn = parseInt(generalAmountOfTales / numberOfColumns) + 1;
            }

            for(let i = 1; i <= numberOfColumns && counter < generalAmountOfTales; i++){
                const column = document.createElement('div');
                
                for(let j = 0; j < amountOfTalesInColumn && counter < generalAmountOfTales; j++){
                    if(typeOfEv || targetAud || dateOfEvent){
                        tileContentLoader(data[arr[counterA]-1], column);

                        counterA++;
                    } else tileContentLoader(data[counter], column);

                    counter++;
                }
                space.appendChild(column);
            }

          
        } catch (error) {
            console.error('Ошибка:', error);
        }
        
    }
    window.addEventListener('resize', checkWindowSize);
    
    checkWindowSize();

    
    //Filters
    //Headers
    
    
    listHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const arrow = header.lastChild;

            document.addEventListener('click', function (event) {
                const isClickInside = header.contains(event.target) ;
                if (!isClickInside) {
                    content.style.maxHeight = null;

                    header.classList.remove("list_header_active");
                    arrow.classList.remove("filter_arrow_rotation");
                }
            });

            document.querySelectorAll('.list_content').forEach(item => {
                if(item != content){
                    item.style.maxHeight = null;

                    item.previousElementSibling.classList.remove("list_header_active");
                    item.previousElementSibling.lastChild.classList.remove("filter_arrow_rotation");
                }
            });
            
            if(content.style.maxHeight){
                content.style.maxHeight = null;

                header.classList.remove("list_header_active");
                arrow.classList.remove("filter_arrow_rotation");
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                
                arrow.classList.add("filter_arrow_rotation");
                header.classList.add("list_header_active");
            }
        })
    })

    //Lists
    
    function contentChecker(){
        const filterBar = document.getElementById('filter_bar');
        const newTargetCriteria = document.getElementById('target_criteria');
        const newTypeCriteria = document.getElementById('type_criteria');
        const newDateCriteria = document.getElementById('date_criteria');

        if(newTargetCriteria.textContent == "" && newTypeCriteria.textContent == "" && newDateCriteria.textContent == ""){
            filterBar.style.display = "none";
        }
    }

    function filterBarCreator() {
        const filterBar = document.getElementById('filter_bar');
        filterBar.style.display = "flex";
        
        if(targetAud){
            const newTargetCriteria = document.getElementById('target_criteria');
            newTargetCriteria.textContent = targetAud;

            newTargetCriteria.addEventListener("click", () => {
                newTargetCriteria.textContent = "";
                targetAud = "";

                spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
                contentChecker();
            })
        } 
        if(typeOfEv){
            const newTypeCriteria = document.getElementById('type_criteria');
            newTypeCriteria.textContent = typeOfEv;

            newTypeCriteria.addEventListener("click", () => {
                newTypeCriteria.textContent = "";
                typeOfEv = "";

                spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
                contentChecker();
            })
        }
        if(dateOfEvent){
            const newDateCriteria = document.getElementById('date_criteria');
            newDateCriteria.textContent = dataConverter(dateOfEvent);

            newDateCriteria.addEventListener("click", () => {
                newDateCriteria.textContent = "";
                dateOfEvent = "";

                spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
                contentChecker();
            })
        }
    }

    targetAudienceCriteria.forEach(criteria => {
        criteria.addEventListener('click', () => {
            targetAud = criteria.textContent;
            spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
           
            filterBarCreator();
        })
    });

    typeOfEventCriteria.forEach(criteria => {
        criteria.addEventListener('click', () => {
            typeOfEv = criteria.textContent;
            spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
            
            filterBarCreator();
        })
    });

    today.addEventListener('click', () => {
        let todayNew = new Date();
        dateOfEvent = todayNew.toISOString().split('T')[0];
        
        spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
        
        filterBarCreator(); 
    });

    tomorrow.addEventListener('click', () => {
        let tomorrowNew = new Date();
        tomorrowNew.setDate(tomorrowNew.getDate() + 1);

        dateOfEvent = tomorrowNew.toISOString().split('T')[0];
        
        spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
        
        filterBarCreator(); 
    });

    inputDate.addEventListener('change', function() {
        dateOfEvent = inputDate.value;  

        spaceLoader(amountOfColumns, targetAud, typeOfEv, dateOfEvent);
        
        filterBarCreator(); 
    });
})
   
