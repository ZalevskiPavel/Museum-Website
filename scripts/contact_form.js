document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('submit');
    const name = document.getElementById('name');
    const email = document.getElementById('email_form');
    const emailConfirm = document.getElementById('email_confirm');
    const select = document.getElementById('select_enquiry');
    const subject = document.getElementById('subject');
    const textarea = document.getElementById('message');

    function createError(){
        const error = document.createElement('div');

        error.classList.add('error');

        error.textContent = "Please fill the fields correctly";

        return error;
    }

    async function sendData(visitorName, visitorEmail, enquiryType, enquirySubject, enquiryMessage) {

        if(!visitorName || !visitorEmail || !enquiryType || !enquirySubject || !enquiryMessage){
            return;
        }
    
        const newEnquiry = { name: visitorName, email: visitorEmail, type: enquiryType, subject: enquirySubject, message:enquiryMessage};
    
        try {
            const response = await fetch('http://localhost:3000/api/enquiries', {
                method: 'POST',  
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEnquiry),  
            });
    
            if (!response.ok) {
                throw new Error('Не удалось отправить данные');
            }
    
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    button.addEventListener('click', event =>  {
        event.preventDefault();

        const selecInd = document.getElementById('select_enquiry').value;
        const toRemove = document.querySelectorAll('.error');

        let allFieldsAreCorrectFilled = true;

        toRemove.forEach( element => {
            element.remove();
        })

        const isFill = (input) => {
            if(input.value == ''){
                input.parentElement.appendChild(createError());

                allFieldsAreCorrectFilled = false;
            }
        }

        isFill(name);
        isFill(email);
        isFill(emailConfirm);
        isFill(subject);
        isFill(textarea);

        if(email.value != emailConfirm.value){
            emailConfirm.parentElement.appendChild(createError());

            allFieldsAreCorrectFilled = false;
        }

        if(select.options[selecInd - 1].text ==  "Select"){
            select.parentElement.appendChild(createError());

            allFieldsAreCorrectFilled = false;
        }

        if(allFieldsAreCorrectFilled){
            sendData(name.value, email.value, select.options[selecInd - 1].text, subject.value, textarea.value);
        }
    })
})