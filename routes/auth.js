const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')

    }
})

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', "Password is required")
        .exists()
],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })

        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }
            // compare the hashed password 
            const isMatched = await bcrypt.compare(password, user.password)
            if (!isMatched) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }
            // jwt 
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'), {
                expiresIn: 360000,
            },
                (err, token) => {
                    if (err) {
                        throw err
                    }
                    res.json({ token })

                })

        } catch (err) {
            console.log(err.message)
            res.status(500)

        }
    })

module.exports = router