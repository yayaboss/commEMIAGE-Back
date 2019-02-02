express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Administrateur');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageAdministrateurs = '';
pageAdministrateur = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let Administrateur = mongoose.model('Administrateur');
    Administrateur.find().then((administrateurs)=>{
        res.render(pageAdministrateurs, administrateurs);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Administrateur = mongoose.model('Administrateur');
    let newAdministrateur = new Administrateur(req.body);
    newAdministrateur.id = newAdministrateur._id;

    newAdministrateur.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Administrateur').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedAdministrateur)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Administrateur = mongoose.model('Administrateur');
    Administrateur.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Administrateur').findOne({id : req.params.id}).then((administrateur)=>{
        if(administrateur){
            res.render(pageAdministrateur, administrateur);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;