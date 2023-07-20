//app.js
const express = require('express')
const app = express()
const path = require("path")
const checkout = require("./routes/checkout")
const { json, urlencoded } = require("body-parser") 
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use("/checkout", checkout)
app.get('/', (req, res) => { res.send(index.html)})
app.listen(3000, () => {
    console.log(`App listening on port 3000`)
})
module.exports = app;