const express = require('express')
const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const nimed = ['Neti', 'Pepi', 'Aadam', 'Klaabu'];

app.get('/test', naitaTest)

function naitaTest(req, res) {
    res.render('test', {nimed: nimed})
}

app.listen(80)