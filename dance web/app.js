var express = require('express')
var app = express()
var fs = require('fs')
const port = process.env.PORT || 8000

const path =require('path')
const bodyparser =require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true , 
useUnifiedTopology: true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

var Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static')) 
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory

app.get('/',(req ,res)=>{
    const params = { }
    res.status(200).render('home.pug')
})
app.get('/contact',(req ,res)=>{
    const params = { }
    res.status(200).render('contact.pug')
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('This item has been saved to the database')
    }).catch(()=>{
        res.status(400).send('item was not saved to the databse')
})
})
app.listen(port ,()=>{
    console.log(`the application running on ${port}`)
})