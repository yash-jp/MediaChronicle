// TO GET THE EXPRESS
const express = require('express');

// TO GET THE EXPRESS HANDLEBARS
const exphbs = require('express-handlebars');

// TO GET THE MONGOOSE
const mongoose = require('mongoose');

const app = express();

// GET BODY-PARSER
const bodyParser = require('body-parser');

// GET THE method-override
const methodOverride = require('method-override');

// DB Config
const db = require('./database');

// CONNECT TO MONGOOSE
mongoose.connect(db.mongoURI,{useMongoClient:true
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

// method-override MIDDLEWARE
app.use(methodOverride('_method'));


// as heroku decide which ports to use by itself
const port = process.env.PORT || 5000;

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

// Edit Idea Form
app.get('/ideas/edit/:id',(req,res)=>{
  Idea.findOne({
    _id:req.params.id
  })
  .then(idea => {
    res.render('ideas/edit',{
      idea:idea
    })
  })
})


//post ideas route
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
    const newUser={
      title:req.body.title,
      details:req.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea=>{
        res.redirect('/ideas');
      })
  }
})

// EDIT (PUT) ideas route
app.put('/ideas/:id',(req,res)=>{
  // FIND THE SAME ONE WITH ID
  Idea.findOne({
    _id:req.params.id
  })
  .then(idea => {
    // new values
    idea.title=req.body.title,
    idea.details=req.body.details

    // this will save the data on that id
    idea.save()
      .then(idea => {
        res.redirect('/ideas');
      })
  });
});

// DELETE ideas route
app.delete('/ideas/delete/:id',(req,res)=>{
  Idea.remove({
    _id:req.params.id
  })
  .then(()=>{
    res.redirect('/ideas');
  })
});

// GET ideas route
app.get('/ideas',(req,res)=>{
  // AS WE WANT ALL THE IDEAS, WE DO NOT NEED ANY SPECIFIC but we ned to sort by date
  Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      console.log(ideas);
      res.render('ideas/index',{ideas:ideas});
    });
});