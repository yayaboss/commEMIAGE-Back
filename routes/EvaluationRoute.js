express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Evaluation');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageEvaluations = '';
pageEvaluation = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let Evaluation = mongoose.model('Evaluation');
    Evaluation.find().then((evaluations)=>{
        res.render(pageEvaluations, evaluations);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Evaluation = mongoose.model('Evaluation');
    let newEvaluation = new Evaluation(req.body);
    newEvaluation.id = newEvaluation._id;

    newEvaluation.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Evaluation').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedEvaluation)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Evaluation = mongoose.model('Evaluation');
    Evaluation.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Evaluation').findOne({id : req.params.id}).then((evaluation)=>{
        if(evaluation){
            res.render(pageEvaluation, evaluation);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;