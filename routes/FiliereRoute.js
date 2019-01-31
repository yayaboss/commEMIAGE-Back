express = require('express'),
app = express();
session = require('cookie-session');

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'todotopsecret'}))

// -- Load model needed for the project
require('../models/Filiere');

lienErreur = '/error';
lienFindAll = '/AllFilieres';
lienAjouter = '/AjouterFiliere';
lienModifier = '/ModifierFiliere';
lienSupprimer = '/SupprimerFiliere/:id';
lienGet = '/GetFiliere/:id';

pageErreur ='';
pageFilieres = '';
pageFiliere = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienFindAll, function (req, res) {
    let Filiere = mongoose.model('Filiere');
    Filiere.find().then((filieres)=>{
        res.render(pageFilieres, filieres);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Filiere = mongoose.model('Filiere');
    let newFiliere = new Filiere(req.body);
    newFiliere.id = newFiliere._id;

    newFiliere.save().then(()=>{
        res.redirect(lienFindAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Filiere').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedFiliere)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienFindAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Filiere = mongoose.model('Filiere');
    Filiere.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienFindAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Filiere').findOne({id : req.params.id}).then((filiere)=>{
        if(filiere){
            res.render(pageFiliere, filiere);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});