//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let ModuleSchema = new Schema({
    id : String,
    nom : String,
    coefficient : Number,
    seuil : Number,
    filiere : Object
});

mongoose.model('Module', ModuleSchema);