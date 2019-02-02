express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Suivi');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageSuivis = '';
pageSuivi = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    let Suivi = mongoose.model('Suivi');
    Suivi.find().then((suivis)=>{
        res.render(pageSuivis, suivis);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    let Suivi = mongoose.model('Suivi');
    let newSuivi = new Suivi(req.body);
    newSuivi.id = newSuivi._id;

    newSuivi.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    mongoose.model('Suivi').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedSuivi)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    let Suivi = mongoose.model('Suivi');
    Suivi.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    mongoose.model('Suivi').findOne({id : req.params.id}).then((suivi)=>{
        if(suivi){
            res.render(pageSuivi, suivi);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;