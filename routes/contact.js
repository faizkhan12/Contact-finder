const express = require('express')
const Contact = require('../models/Contact')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')

const router = express.Router()

// @route   GET api/contact
// @desc    Get all users contact associated with user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact
            .find({ user: req.user.id })
            .sort({ date: -1 })
        return res.json(contacts)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')

    }
})


// @route   POST api/contact
// @desc    Add new contact
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required')
        .not()
        .isEmpty()
]
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })

        }
        const { name, email, phone, type } = req.body

        try {
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            })

            const contact = await newContact.save()
            return res.json(contact)

        } catch (err) {
            console.log(err)
            res.status(500).send('Server Error')
        }

    })

// @route   PUT api/contact/:id
// @desc    update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body

    // build contact object
    const contactFields = {}
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' })
        }
        // user owns contact
        if (contact.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        // actual update
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { $new: true })
        return res.json(contact)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }

})

// @route   DELETE api/contact/:id
// @desc    Delete new contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {

    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' })
        }
        // user owns contact
        if (contact.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' })
        }

        // actual deletion
        await Contact.findByIdAndRemove(req.params.id)
        res.json({ msg: 'Contact Removed' })

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }

})

module.exports = router