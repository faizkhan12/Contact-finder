const express = require('express')
const Users = require('./routes/users')
const Auth = require('./routes/auth')
const Contact = require('./routes/contact')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// Init Middleware
app.use(express.json({ extended: false }))

// define routes
app.use('/api/users', Users)
app.use('/api/auth', Auth)
app.use('/api/contact', Contact)

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // set a static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

// Connect Database
connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is up running on port ${PORT}`))