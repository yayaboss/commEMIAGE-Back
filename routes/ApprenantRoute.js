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
require('../models/Apprenant');

lienErreur = '/error';
lienFindAll = '/AllApprenants';
lienAjouter = '/AjouterApprenant';
lienModifier = '/ModifierApprenant';
lienSupprimer = '/SupprimerApprenant/:id';
lienGet = '/GetApprenant/:id';

pageErreur ='';
pageApprenants = '';
pageApprenant = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienFindAll, function (req, res) {
    let Apprenant = mongoose.model('Apprenant');
    Apprenant.find().then((apprenants)=>{
        res.render(pageApprenants, apprenants);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Apprenant = mongoose.model('Apprenant');
    let newApprenant = new Apprenant(req.body);
    newApprenant.id = newApprenant._id;

    newApprenant.save().then(()=>{
        res.redirect(lienFindAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Apprenant').updateOne({id : req.body.id}, {$set : req.body}, (err, updatedApprenant)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienFindAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Apprenant = mongoose.model('Apprenant');
    Apprenant.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienFindAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Apprenant').findOne({id : req.params.id}).then((apprenant)=>{
        if(apprenant){
            res.render(pageApprenant, apprenant);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});