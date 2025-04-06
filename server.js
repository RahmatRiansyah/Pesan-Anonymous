const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const messageRoutes = require('./routes/messages');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/anonymousMessages', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rute untuk pesan
app.use('/api/messages', messageRoutes);

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});