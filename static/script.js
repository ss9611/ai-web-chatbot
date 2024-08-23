document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessage('You', userInput);
        getChatbotResponse(userInput);
        document.getElementById('user-input').value = '';  // Clear input field
    }
});

function addMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageDiv);
}

function getChatbotResponse(prompt) {
    fetch('/chat', {  // This will send a request to your Python backend
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        addMessage('Bot', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage('Bot', 'Error: Unable to get a response.');
    });
}
