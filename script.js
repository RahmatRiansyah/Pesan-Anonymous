document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('messageContent').value.trim();

    if (!content) {
        alert('Message content cannot be empty!');
        return;
    }

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });

        if (response.ok) {
            document.getElementById('messageContent').value = '';
            loadMessages();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please check your connection.');
    }
});

async function loadMessages() {
    try {
        const response = await fetch('/api/messages');
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const messages = await response.json();
        const messagesDiv = document.getElementById('messages');
        messagesDiv.innerHTML = ''; // Clear existing messages

        messages.forEach((message) => {
            const messageElement = document.createElement('div');
            messageElement.textContent = message.content;
            messagesDiv.appendChild(messageElement);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load messages. Please try again.');
    }
}