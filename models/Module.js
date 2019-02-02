//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let ModuleSchema = new Schema({
    nom : String,
    coefficient : {type: Number, min: 0, default: 1},
    seuil : {type: Number, min: 0, default: 10},
    filiere : {type: Object, objectType: {
        nom: String
    }},
    tuteur : {type: Object, objectType: {
        nom : String,
        prenom : String
    }},
    semestre : {type: Object, objectType: {
        nom : String
    }}
});

let Module = mongoose.model('Module', ModuleSchema);
module.exports = Module;