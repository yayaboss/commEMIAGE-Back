//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let TuteurSchema = new Schema({
    nom : {type: String, stringTransform: function(string) {
        return string.toUpperCase();
    }},
    prenom : String,
    adresse : String,
    email : {type: String, unique: true, regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")},
    dateFormation : Date,
    module : [{
            nom : String
    }],
    apprenant : [{
        nom : String,
        prenom : String
    }]
});

let Tuteur = mongoose.model('Tuteur', TuteurSchema);
module.exports = Tuteur;