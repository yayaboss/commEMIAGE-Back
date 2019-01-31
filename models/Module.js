//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let ModuleSchema = new Schema({
    id : {type: String, unique: true},
    nom : String,
    coefficient : {type: Number, min: 0, default: 1},
    seuil : {type: Number, min: 0, default: 10},
    filiere : {type: Object, objectType: {
        nom: String
      }}
});

mongoose.model('Module', ModuleSchema);