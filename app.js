const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Photo = require('./models/Photo');
// const path = require('path')
const app = express();

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//TEMPLATE ENGINE
app.set('view engine', 'ejs');


//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//ROUTES
app.get('/', async (req, res) => {
  //res.sendFile(path.resolve(__dirname,'views/index.html'))

  const photos = await Photo.find({})
  res.render('index',{
    photos
  })
});

app.get('/about', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'views/index.html'))
  res.render('about')
});


app.get('/add_post', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'views/index.html'))
  res.render('add_post')
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body)
  res.redirect('/')
});


const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portuna bağlandı.`)
})