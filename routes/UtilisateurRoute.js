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
require('../models/Utilisateur');

lienErreur = '/error';
lienFindAll = '/AllUtilisateurs';
lienAjouter = '/AjouterUtilisateur';
lienModifier = '/ModifierUtilisateur';
lienSupprimer = '/SupprimerUtilisateur/:id';
lienGet = '/GetUtilisateur/:id';

pageErreur ='';
pageUtilisateurs = '';
pageUtilisateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienFindAll, function (req, res) {
    let Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find().then((utilisateurs)=>{
        res.render(pageUtilisateurs, utilisateurs);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Utilisateur = mongoose.model('Utilisateur');
    let newUtilisateur = new Utilisateur(req.body);
    newUtilisateur.id = newUtilisateur._id;

    newUtilisateur.save().then(()=>{
        res.redirect(lienFindAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Utilisateur').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedUtilisateur)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienFindAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienFindAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Utilisateur').findOne({id : req.params.id}).then((utilisateur)=>{
        if(utilisateur){
            res.render(pageUtilisateur, utilisateur);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});