const express = require('express')
const dotenv = require('dotenv').config()
const router = require('./routes/goalRoutes')
const { errorMiddleware } = require('./middlewares/errorMiddleware')
const port = process.env.PORT || 5000
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    status: "OK",
    env : process.env.ENV,
  })
})

app.use(errorMiddleware)
app.use('/api/goals', router)

app.listen(port, () => {console.log("Server started on port: " + port);})

