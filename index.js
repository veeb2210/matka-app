const express = require('express')
const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const nimed = ['Neti', 'Pepi', 'Aadam', 'Klaabu'];

const matk1 = {
    nimetus: 'Rabamatk',
    osalejaid: 5,
    kuupaev: '2023-05-03',
    registreerunud: [],
    kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
    piltUrl: '/pildid/matkaja.png'
  }
  
  const matk2 = {
    nimetus: 'Rattamatk',
    osalejaid: 10,
    kuupaev: '2023-06-03 - 2021-06-10',
    registreerunud: [],
    kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
    piltUrl: '/pildid/rattamatk.jpg'
  }
  
  const matk3 = {
    nimetus: 'Süstamakt',
    osalejaid: 10,
    kuupaev: '2023-07-23',
    registreerunud: [],
    kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
    piltUrl: '/pildid/syst1.jpg'
  }
  const matk4 = {
    nimetus: 'Rattamatk Pärnumaal',
    osalejaid: 6,
    kuupaev: '2023-07-03 - 2021-07-10',
    registreerunud: [],
    kirjeldus: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, eos voluptatum eum explicabo ipsa dolores ullam ab saepe sequi aliquam suscipit eaque nam deserunt tenetur vero autem molestias eius! Praesentium?',
    piltUrl: '/pildid/rattamatk.jpg'
  }

  const matkad = [matk1, matk2, matk3, matk4]
  
app.get('/test', naitaTest)
app.get('/', naitaEsilehte)


function naitaTest(req, res) {
    res.render('test', {nimed: nimed})
}

function naitaEsilehte(req,res) {
    res.render('esileht', {matkad: matkad})
}

app.listen(80)