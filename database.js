if(process.env.NODE === 'production'){
  module.exports = {mongoURI : 
    'mongodb+srv://yash:yash@gladiator-wgnat.mongodb.net/test?retryWrites=true&w=majority'}
}else{
  module.exports={mongoURI:
  'mongodb://localhost/mediachronicle-dev'}
}