// steps- 1 create a package.json by (npm init)
// step - 2 Create a package-lock.json 
// step -   Check depandancy and install all the dependancy
// step - 







const express = require("express");
const path = require('path');
const app = express();
const port = 8000;
// Constant Variable Giving to Mongodb 
const mongoose = require('mongoose');
// Body Parser is requried to fetch data from contact page 
const bodyparser = require('body-parser');


// connecting Mongodb to out database
mongoose.connect('mongodb://127.0.0.1/contactDance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Inerting Query and there Attributes
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  message: String
})
// Giving contacSchema to Database Collection 
var contact = mongoose.model('contact', contactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded())

//PUG SPECIFIC SETUP
app.set('view engine', 'pug')// set complete engine at the pug
app.set('views', path.join(__dirname, 'views'))// set the view directory


//endpoints
app.get('/',(req, res)=>{
    const con="this is the best content on the internet so far to use it wisely"
    const param= {'title': 'Pubg is the best game', 'content': con}
    res.status(200).render('./home.pug', param);
})
// Contact page get request
app.get('/contact',(req, res)=>{
  const param= { }
  res.status(200).render('contact.pug', param);
})
// Contact post request and saving data from contact to the collection
app.post('/contact',(req, res)=>{
  var Mydata = new contact(req.body);
  Mydata.save().then(( )=>{
      res.send("this item has been saved to the database")
  }).catch(()=>{
    res.send(400).send("Item was not saved to the database")
  });
  // res.status(200).render('contact.pug');
})


// Start the server
app.listen(port, () => {
    console.log(
      `the application will strat on this port http://localhost:${port}`
    );
  });
  
  
  