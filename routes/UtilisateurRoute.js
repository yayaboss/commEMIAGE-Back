express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Utilisateur');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageUtilisateurs = '';
pageUtilisateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
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
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Utilisateur').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedUtilisateur)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Utilisateur = mongoose.model('Utilisateur');
    Utilisateur.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
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

module.exports = app;