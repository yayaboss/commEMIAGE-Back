const assert = require('assert');
const AdministrateurChar = require('../models/administrateur');
//describe tests
describe('saving records', function(){

//create tests
  it('Saves a record to the database', function(done){
    //création de la nouvelle instance du model AdministrateurChar
    var char = new AdministrateurChar({
      nom: 'adminirgeoh eo'
    });

//on utilise save pour sauvegarder cette instance dans la db

 char.save().then(function(){
   assert(char.isNew === false);
   done();
 });

  });

});
