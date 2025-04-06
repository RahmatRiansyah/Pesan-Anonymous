const express = require("express");
const Message = require("./Message");
const router = express.Router();

// Mengambil semua pesan
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mengirim pesan baru
router.post("/", async (req, res) => {
  const message = new Message({
    content: req.body.content,
  });

  try {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
