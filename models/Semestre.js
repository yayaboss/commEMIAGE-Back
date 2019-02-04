//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let SemestreSchema = new Schema({
    nom : String,
    dateDebut : Date,
    dateFin : Date,
    module : [{
            nom : String
    }],
});

let Semestre = mongoose.model('Semestre', SemestreSchema);
module.exports = Semestre;