document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('form_button');
    const email = document.getElementById('email_form');
    const creditCard = document.getElementById('cred_card_form');
    const dateInput = document.getElementById('date_input_form');

    function createError(){
        const error = document.createElement('div');

        error.classList.add('error');
        error.textContent = "Please fill the fields correctly";

        return error;
    }

    function formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
    
        let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
        input.value = formattedValue;
    
        if (input.value.length > 19) {
            input.value = input.value.slice(0, 19);
        }
    }

    function generateRandomNumber(tickets) {
        const number = Math.floor(Math.random() * 900000) + 100000;

        let isInDataBase = false;

        tickets.forEach(ticket => {
            if(ticket == number) {
                isInDataBase = true;
            }
        })

        if(isInDataBase) {
            generateRandomNumber(tickets);
        } return number;
    }

    async function generateSerialNumber(){
        try {
            const response = await fetch('http://localhost:3000/api/tickets_serial_number');
            if (!response.ok) {
                throw new Error('Не удалось получить данные');
            }
            const tickets = await response.json();  
            
            return generateRandomNumber(tickets);
            
            
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    async function sendData(emailValue, creditCardValue, dateInputValue) {
        const seria = await generateSerialNumber();
        const id = sessionStorage.getItem('id');

        console.log(seria);
        console.log(id);

        if(!emailValue || !creditCardValue || !dateInputValue || !id || !seria){
            return;
        }
    
        const newTicket = { eventID: id, eventDate: dateInputValue, ticketSerialNumber: seria, email:emailValue, creditCard: creditCardValue};
        console.log(newTicket);
        try {
            const response = await fetch('http://localhost:3000/api/tickets', {
                method: 'POST',  
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTicket),  
            });
    
            if (!response.ok) {
                throw new Error('Не удалось отправить данные');
            }
    
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    creditCard.addEventListener('input', () => {
        formatCardNumber(creditCard);
    })

    button.addEventListener('click', event =>  {
        event.preventDefault();

        let allFieldsAreCorrectFilled = true;
        const toRemove = document.querySelectorAll('.error');
        
        toRemove.forEach( element => {
            element.remove();
        })

        console.log(dateInput.value);

        const isFill = (input) => {
            if(input.value == ''){
                input.parentElement.appendChild(createError());

                allFieldsAreCorrectFilled = false;
            }
        }

        isFill(email);
        isFill(creditCard);
        isFill(dateInput);

        if(creditCard.value.length < 19){
            creditCard.parentElement.appendChild(createError());

            allFieldsAreCorrectFilled = false;
        }

        if(allFieldsAreCorrectFilled){
            sendData(email.value, creditCard.value, dateInput.value);
        }
    })
})