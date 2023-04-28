const asyncHandler = require('express-async-handler');
const contact = require('../models/contactModel');
//@desc Get all contacts
//@route GET /api/contact
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contactsData = await contact.find({ user_id: req.userData.id });
    res.status(200).json(contactsData);
});

//@desc Create new contacts
//@route POST /api/contact
//@access private
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
        phone,
        user_id: req.userData.id
    });
    res.status(201).json(contactsData);
});

//@desc Update the contacts
//@route PUT /api/contact/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contactData = await contact.findById(req.params.id);
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contactData.user_id.toString() !== req.userData.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user information");
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
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contactData = await contact.findById(req.params.id);
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contactData.user_id.toString() !== req.userData.id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user information");
    }
    await contact.findByIdAndRemove(req.params.id);
    res.status(200).json(contactData);
});

//@desc Get contacts by id
//@route GET /api/contact/:id
//@access private
const getContactById = asyncHandler(async (req, res) => {
    const contactData = await contact.findById(req.params.id);
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contactData);
});

module.exports = { getContact, createContact, updateContact, deleteContact, getContactById };