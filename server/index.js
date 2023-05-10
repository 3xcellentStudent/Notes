const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const routes = require('./components/routes')

const PORT = process.env.PORT || 5500

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api', routes)

app.listen(PORT, () => {
   console.log(`App has been started on PORT: ${PORT}`)
})