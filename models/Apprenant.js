//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let ApprenantSchema = new Schema({
    nom : {type: String, stringTransform: function(string) {
        return string.toUpperCase();
    }},
    prenom : String,
    adresse : String,
    email : {type: String, unique: true, regex: new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")},
    dateFormation : Date,
    filiere : {type: Object, objectType: {
        nom: String
    }},
    module : [{
            nom : String
    }],
    evaluation : [{
            alias : String,
    }],
    suivi : [{
            alias : String,
    }]
});

let Apprenant = mongoose.model('Apprenant', ApprenantSchema);
module.exports = Apprenant;