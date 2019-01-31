//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let UtilisateurSchema = new Schema({
    id : String,
    nom : String,
    prenom : String,
    adresse : String,
    email : String
});

mongoose.model('Utilisateur', UtilisateurSchema);