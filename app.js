// TO GET THE EXPRESS
const express = require('express');

// TO GET THE EXPRESS HANDLEBARS
const exphbs = require('express-handlebars');

const app = express();

// Handle Bars MIDDLEWARE
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');


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