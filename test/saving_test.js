const assert = require('assert');
const MarioChar = require('../models/mariochar');
//describe tests
describe('saving records', function(){

//create tests
  it('Saves a record to the database', function(done){

    var char = new MarioChar({
      name: 'Mario'
    });

 char.save().then(function(){
   assert(char.isNew === false);
   done();
 });

  });

});
