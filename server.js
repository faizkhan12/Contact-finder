const express = require('express')
const Users = require('./routes/users')
const Auth = require('./routes/auth')
const Contact = require('./routes/contact')
const connectDB = require('./config/db')

const app = express()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    res.json({ msg: 'Welcome' })
})

// define routes
app.use('/api/users', Users)
app.use('/api/auth', Auth)
app.use('/api/contact', Contact)

// Connect Database
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is up running on port ${PORT}`))