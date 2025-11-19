// setup
const express = require('express');
const app = express();
const router = express.Router();

// start the webserver
app.listen(3000, function(){
    console.log("Listening on port 3000");
});

// making an api using routes

// Get request - /hello
