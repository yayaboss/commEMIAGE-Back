//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let FiliereSchema = new Schema({
    id : String,
    nom : String,
    description : String,
    modules : Array,
    apprenants : Array
});

mongoose.model('Filiere', FiliereSchema);