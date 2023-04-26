// Import Package
const express = require('express');
const env = require('dotenv').config();

//Initialize the server configuration
const app = new express();
const port = process.env.PORT || 5000;

// app.get('/api/contact', (req, res) => {
//     res.send("Get All Contacts");
// });

// app.get('/api/contact', (req, res) => {
//     res.json({ message: "Get All Contacts" });
// });

app.get('/api/contact', (req, res) => {
    res.status(201).json({ message: "Get All Contacts" });
});

app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
});