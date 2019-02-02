//--- Module dependencies
const mongoose 	= require('mongoose'),
    Schema	 	= mongoose.Schema;

//------------------------------------------- Resources Schema
let EvaluationSchema = new Schema({
    alias : String,
    controleContinue : {type: [Number]},
    controleTerminal : {type: Number, min: 0, default: 1},
    commentaireTuteur : String,
    commentaireApprenant : String,
    tuteur : {type: Object, objectType: {
        nom : String,
        prenom : String
    }},
    apprenant : {type: Object, objectType: {
        nom : String,
        prenom : String
    }},
    module : {type: Object, objectType: {
        nom : String
    }},
});

let Evaluation = mongoose.model('Evaluation', EvaluationSchema);
module.exports = Evaluation;