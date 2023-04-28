// Import Package
const express = require('express');
const env = require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require('./config/dbConnection');
const cors = require('cors');

//Connect Database
connectDb();
//Initialize the server configuration
const app = new express();
const port = process.env.PORT || 5000;

// app.get('/api/contact', (req, res) => {
//     res.send("Get All Contacts");
// });

// app.get('/api/contact', (req, res) => {
//     res.json({ message: "Get All Contacts" });
// });

// app.get('/api/contact', (req, res) => {
//     res.status(201).json({ message: "Get All Contacts" });
// });

//Cross Orgin Setup
app.use(cors());

//In-build middleware body parser on express
app.use(express.json());

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Running On Port ${port}`);
});