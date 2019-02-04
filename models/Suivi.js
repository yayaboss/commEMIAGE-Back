//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let SuiviSchema = new Schema({
    alias : String,
    tuteur : {type: Object, objectType: {
        nom : String,
        prenom : String
    }},
    apprenant : {type: Object, objectType: {
        nom : String,
        prenom : String
    }},
    module : {type: Object, objectType: {
        nom : String
    }},
});

let Suivi = mongoose.model('Suivi', SuiviSchema);
module.exports = Suivi;