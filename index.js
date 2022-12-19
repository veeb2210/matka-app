const express = require('express')
const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const PORT = process.env.PORT || 3000 
const MongoClient = require("mongodb").MongoClient;

const andmebaas = "matkaapp"
const salasona = "9MUXqUGIBNdMXmnV"
const mongoUrl = `mongodb+srv://matkaapp:${salasona}@cluster0.klxsw6j.mongodb.net/${andmebaas}?retryWrites=true&w=majority`
const client = new MongoClient(mongoUrl);

const nimed = ['Neti', 'Pepi', 'Aadam', 'Klaabu'];

const registreerumised = []

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
  const matkadelOsalejad = []
  
app.get('/test', naitaTest)
app.get('/', naitaEsilehte)
app.get('/uudised', naitaUudiseid)
app.get('/matk/:matk', function(req, res) {
  console.log('Matka number: ' + req.params.matk)
  res.render(
    'matk', 
    {index: req.params.matk, matk: matkad[req.params.matk-1] }
  )
})
app.get('/registreerumine', registeeruMatkale)

app.get('/api/uudised', tagastaUudised)
app.get('/api/matkadel_osalejad', function(req, res) {
  res.json(matkadelOsalejad)
})


function naitaTest(req, res) {
    res.render('test', {nimed: nimed})
}

function naitaEsilehte(req,res) {
    res.render('esileht', {matkad: matkad})
}

function naitaUudiseid(req,res) {
    res.render('uudised')
}

async function registeeruMatkale(req, res) {
  const uusOsaleja = {
    nimi: req.query.nimi,
    email: req.query.email,
    markus: req.query.markus,
    index: req.query.index,
  }
  matkadelOsalejad.push(uusOsaleja)
  
  try {
    await client.connect();
    const database = client.db(andmebaas);
    const osalejad = database.collection("osalejad");
    const result = await osalejad.insertOne(uusOsaleja)
    console.log(`Registreerumine lisati andmebaasi _id: ${result.insertedId}`)
  } finally {
    await client.close();
  }
 

  res.send('Registreerumine õnnestus!')
}

function tagastaUudised(req, res) {
  const uudised = [
      {
          tiitel: 'Uudis 1',
          sisu: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aliquid nihil. Cum eaque beatae dolorem tenetur, distinctio delectus nesciunt, laboriosam aut rem quia dicta hic? Id ut pariatur saepe delectus.',
          autor: 'Mina Ise'
      },
      {
          tiitel: 'Uudis 2',
          sisu: 'See on teine uudis',
          autor: 'Mina Ise'
      },
      {
          tiitel: 'Uudis 3',
          sisu: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aliquid nihil. Cum eaque beatae dolorem tenetur, distinctio delectus nesciunt, laboriosam aut rem quia dicta hic? Id ut pariatur saepe delectus.',
          autor: 'Keegi Teine'
      },
      {
          tiitel: 'Uudis 4',
          sisu: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, aliquid nihil. Cum eaque beatae dolorem tenetur, distinctio delectus nesciunt, laboriosam aut rem quia dicta hic? Id ut pariatur saepe delectus.',
          autor: 'Mina Ise'
      },
  ]

  res.json(uudised)
}

app.listen(PORT, function() {console.log("Matkaäpp kuulab pordil: " + PORT)})