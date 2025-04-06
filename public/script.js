document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('messageContent').value;

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
    }
});

async function loadMessages() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.inner