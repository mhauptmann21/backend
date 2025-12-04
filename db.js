const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sdev265:Password@songdb.qvlebxh.mongodb.net/?appName=SongDB");

console.log("MongoDB connected")
module.exports = mongoose;