//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let ApprenantSchema = new Schema({
    id : {type: String, unique: true},
    utilisateur :  {type: Object, objectType: {
        nom: String
      }},
    dateFormation : Date,
    modules : Array,
    apprenants : Array
});

mongoose.model('Apprenant', ApprenantSchema);