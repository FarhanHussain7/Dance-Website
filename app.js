// steps- 1 create a package.json by (npm init)
// step - 2 Create a package-lock.json 
// step - 3 Check depandancy and install all the dependancy
// step - 4 Create a server.js file and write the code for the server
// step - 5 Create a views folder and create a pug file for the home page
// step - 6 Create a static folder and add css files
// step - 7 Create a contact page and add it to the views folder
// step - 8 Add a form to the contact page and add it to the static folder
// step - 9 Add a post request to the contact page and save data to mongodb
// step - 10 Add a get request to the contact page and display data from mongodb



const express = require("express");
const path = require('path');
const app = express();
require('dotenv').config(); // Load environment variables
const port = process.env.PORT || 8000;
const Mongodb = process.env.MONGO_URL || "mongodb+srv://fh4456200_db_user:y7O1u1Fhsau44TFy@cluster0.cmwywmq.mongodb.net/DanceWeb";
// Constant Variable Giving to Mongodb 
const mongoose = require('mongoose');
// Body Parser is requried to fetch data from contact page 
const bodyparser = require('body-parser');


// connecting Mongodb to out database
mongoose.connect(Mongodb)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
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
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

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
      res.status(200).send("this item has been saved to the database")
  }).catch((err)=>{
    console.error("Save error:", err);
    res.status(400).send("Item was not saved to the database")
  });
  // res.status(200).render('contact.pug');
})


// Start the server
app.listen(port, () => {
    console.log(
      `the application will strat on this port http://localhost:${port}`
    );
  });
  
  
  