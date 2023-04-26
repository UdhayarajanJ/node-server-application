const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(201).json({ message: "Get All Contacts" });
});

router.route('/').post((req, res) => {
    res.status(201).json({ message: "Create Contacts" });
});

router.route('/:id').put((req, res) => {
    res.status(201).json({ message: `Update Contacts For ${req.params.id}` });
});

router.route('/:id').get((req, res) => {
    res.status(201).json({ message: `Get Contact For ${req.params.id}` });
});

router.route('/:id').delete((req, res) => {
    res.status(201).json({ message: `Delete Contact For ${req.params.id}` });
});


module.exports = router;