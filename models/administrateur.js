const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model

let AdministrateurCharSchema = new Schema({

  nom: {type: String, stringTransform: function(string) {
        return string.toUpperCase();
      }},
  prenom : String,
  adresse : String,
  email : {type: String, unique: true, regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")}
});

let AdministrateurChar = mongoose.model('administrateurchar',AdministrateurCharSchema);

module.exports = AdministrateurChar;

var myChar= new AdministrateurChar({

})
