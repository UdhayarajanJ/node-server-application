const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contact
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contactsData = await contact.find();
    res.status(200).json(contactsData);
});

//@desc Create new contacts
//@route POST /api/contact
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log("The Request Body Is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mendatory");
    }

    const contactsData = await contact.create({
        name,
        email,
        phone
    });
    res.status(201).json(contactsData);
});

//@desc Update the contacts
//@route PUT /api/contact/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contactData = await contact.findById(req.params.id);
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@desc Delete the contacts
//@route DELETE /api/contact/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    const contactData = await contact.findById(req.params.id);
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contactData);
});

//@desc Get contacts by id
//@route GET /api/contact/:id
//@access public
const getContactById = asyncHandler(async (req, res) => {
    const contactData = await contact.findById(req.params.id);
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contactData);
});

module.exports = { getContact, createContact, updateContact, deleteContact, getContactById };