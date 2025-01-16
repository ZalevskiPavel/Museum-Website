document.addEventListener('DOMContentLoaded', () => {
    function allIsGoodMessageReveal() {
        const container = document.querySelector('.newsletter')
        const message = document.createElement('div');
    
        message.textContent = "Subscription completed";
    
        container.appendChild(message);
    }
    
    async function sendData(event) {
        event.preventDefault();
    
        const email = document.getElementById('email').value;
    
        if(!email){
            return;
        }
    
        const newUser = { email: email };
    
        try {
            const response = await fetch('http://localhost:3000/api/newsletter_emails', {
                method: 'POST',  
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),  
            });
    
            if (!response.ok) {
                throw new Error('Не удалось отправить данные');
            } else {
                allIsGoodMessageReveal();
            }
    
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    
    const button = document.getElementById('sign_up');
    
    button.addEventListener('click', sendData);
})