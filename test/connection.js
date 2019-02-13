const mongoose = require('mongoose');

//ES6 promises
mongoose.Promise = global.Promise;

// Connect to the db before tests run
before(function(done){

  //Connect to mongodb
  mongoose.connect('mongodb://localhost/comemiage');// on précise où on veut enregistrer nos records
  mongoose.connection.once('open',function(){
    console.log('connection has been made');
    done();
  }).on('error', function(error){
    console.log('Connection error', error);
  });

});
/*
//Drop the characters collection before each tests
//Empty the db before every single test so that evry single test can work in isolation
beforeEach(function(done){
  //Drop the collection
  mongoose.connection.collections.administrateurchars.drop(function(){
    done();

});
*/
