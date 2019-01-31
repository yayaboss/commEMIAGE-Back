//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let FiliereSchema = new Schema({
    id : {type: String, unique: true},
    nom : String,
    description : String,
    modules : Array,
    apprenants : Array
});

mongoose.model('Filiere', FiliereSchema);