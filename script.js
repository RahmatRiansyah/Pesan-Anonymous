document.getElementById('messageForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('messageContent').value;

    // Kirim pesan ke backend
    const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (response.ok) {
        const messagesDiv = document.getElementById('messages');
        const newMessage = document.createElement('div');
        newMessage.textContent = content;
        messagesDiv.appendChild(newMessage);
        document.getElementById('messageContent').value = '';
    } else {
        console.error('Gagal mengirim pesan');
    }
});

// Fungsi untuk mengambil dan menampilkan pesan
async function fetchMessages() {
    const response = await fetch('http://localhost:5000/api/messages');
    const messages = await response.json();
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Kosongkan div sebelum menambahkan pesan baru

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message.content;
        messagesDiv.appendChild(messageElement);
    });
}

// Panggil fungsi untuk mengambil pesan saat halaman dimuat
fetchMessages();