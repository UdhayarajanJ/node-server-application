const express = require('express');
const router = express.Router();
const { getContact, createContact, updateContact, deleteContact, getContactById } = require('../controllers/contactController');

router.route('/').get(getContact);
router.route('/').post(createContact);
router.route('/:id').put(updateContact);
router.route('/:id').get(getContactById);
router.route('/:id').delete(deleteContact);


module.exports = router;