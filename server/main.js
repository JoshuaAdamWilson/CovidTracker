// ESM syntax is supported.
const cors = require('cors')
const express = require('express')
const connectDB = require('../config/db')


const app = express()
// connect database
connectDB()

// app.use(cors)
// Middleware
app.use(express.json({ extended: false }))
// app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 4000



app.get('/', (req, res) => res.send('API Running'))

app.use('/api/users', require('../routes/api/users'))
app.use('/api/auth', require('../routes/api/auth'))
app.use('/api/profile', require('../routes/api/profile'))

app.listen(port, () => {
  console.log(`Express Server is running on Port ${port}`)
})
