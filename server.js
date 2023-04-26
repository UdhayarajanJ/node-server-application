// Import Package
const express = require('express');
const env = require('dotenv').config();

//Initialize the server configuration
const app = new express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
});