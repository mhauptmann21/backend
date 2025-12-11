const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sdev265:Password@songdb.qvlebxh.mongodb.net/?appName=SongDB");

module.exports = mongoose;