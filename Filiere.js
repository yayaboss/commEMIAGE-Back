//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let FiliereSchema = new Schema({
    nom : String,
    description : String,
    module : [{
            nom : String
    }],
    apprenant : [{
        nom : String,
        prenom : String
    }]
});

let Filiere = mongoose.model('Filiere', FiliereSchema);
module.exports = Filiere;