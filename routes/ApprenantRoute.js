express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Apprenant');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageApprenants = '';
pageApprenant = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
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
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Apprenant').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedApprenant)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Apprenant = mongoose.model('Apprenant');
    Apprenant.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
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

module.exports = app;