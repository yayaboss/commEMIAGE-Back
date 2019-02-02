express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Tuteur');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageTuteurs = '';
pageTuteur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let Tuteur = mongoose.model('Tuteur');
    Tuteur.find().then((tuteurs)=>{
        res.render(pageTuteurs, tuteurs);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Tuteur = mongoose.model('Tuteur');
    let newTuteur = new Tuteur(req.body);
    newTuteur.id = newTuteur._id;

    newTuteur.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Tuteur').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedTuteur)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Tuteur = mongoose.model('Tuteur');
    Tuteur.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Tuteur').findOne({id : req.params.id}).then((tuteur)=>{
        if(tuteur){
            res.render(pageTuteur, tuteur);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;