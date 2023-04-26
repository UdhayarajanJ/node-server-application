const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(201).json({ message: "Get All Contacts" });
});


module.exports = router;