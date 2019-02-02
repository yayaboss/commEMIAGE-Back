express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Semestre');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageSemestres = '';
pageSemestre = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let Semestre = mongoose.model('Semestre');
    Semestre.find().then((semestres)=>{
        res.render(pageSemestres, semestres);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Semestre = mongoose.model('Semestre');
    let newSemestre = new Semestre(req.body);
    newSemestre.id = newSemestre._id;

    newSemestre.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Semestre').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedSemestre)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Semestre = mongoose.model('Semestre');
    Semestre.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Semestre').findOne({id : req.params.id}).then((semestre)=>{
        if(semestre){
            res.render(pageSemestre, semestre);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;