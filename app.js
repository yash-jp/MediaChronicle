// TO GET THE EXPRESS
const express = require('express');

// TO GET THE EXPRESS HANDLEBARS
const exphbs = require('express-handlebars');

// TO GET THE MONGOOSE
const mongoose = require('mongoose');

const app = express();

// GET BODY-PARSER
const bodyParser = require('body-parser');

// CONNECT TO MONGOOSE
mongoose.connect('mongodb://localhost/mediachronicle-dev',{useMongoClient:true
})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log(err));

  // LOAD IDEA MODEL
  require('./models/Idea');
  const Idea = mongoose.model('ideas');

// Handle Bars MIDDLEWARE
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

// body-parser MIDDLEWARE
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const port = 5000;

app.listen(port,function(){
  console.log(`Server started on port ${port}`);
});

// INDEX ROUTE
app.get('/',(req,res) => {
  res.render("index");
});

// ABOUT ROUTE
app.get('/about',(req,res) => {
  res.render("about");
});

// Add Idea Form
app.get('/ideas/add',(req,res)=>{
  res.render('ideas/add');
})

// ideas route


app.post('/ideas',(req,res)=>{
  let errors=[];

  if(!req.body.title){
    errors.push({text:'Please add title'});
  }

  if(!req.body.details){
    errors.push({text:'Please enter details'});
  }

  if(errors.length>0){
    res.render('ideas/add',{
      errors:errors,
      title:req.body.title,
      details:req.body.details
    });
  }else{
    res.send('passed');
  }
})