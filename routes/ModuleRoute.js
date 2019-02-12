express = require('express'),
app = express();

// --- middleware
// - body-parser needed to catch and to treat information inside req.body
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

// -- Load model needed for the project
require('../models/Module');

lienErreur = '/error';
lienAll = '/';
lienAjouter = '/add';
lienModifier = '/update/:id';
lienSupprimer = '/delete/:id';
lienGet = '/get/:id';

pageErreur ='';
pageModules = '';
pageModule = '';

// -- ERROR
app.get(lienErreur, function(req, res) {
    console.log("Module: ERROR");

    res.render(pageErreur);
})

// -- FIND ALL
app.get(lienAll, function (req, res) {
    console.log("Module: FIND ALL");

    let Module = mongoose.model('Module');
    Module.find().then((modules)=>{
        res.render(pageModules, modules);
    })
});
// -- CREATE
app.post(lienAjouter, function (req, res) {
    console.log("Module: CREATE");

    let Module = mongoose.model('Module');
    let newModule = new Module(req.body);
    console.log("add module:" + newModule);
    newModule.id = newModule._id;

    newModule.save().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    })
});

// -- UPDATE
app.put(lienModifier, function (req, res) {
    console.log("Module: UPDATE");

    mongoose.model('Module').updateOne({id : req.params.id}, {$set : req.body}, (err, updatedModule)=>{
       if(err){
            res.redirect(lienErreur);
       }else{
            res.redirect(lienAll);
       }
    });
});

// -- DELETE
app.delete(lienSupprimer, function (req, res) {
    console.log("Module: DELETE");

    let Module = mongoose.model('Module');
    Module.find({id : req.params.id}).deleteOne().then(()=>{
        res.redirect(lienAll);
    },(err)=>{
        res.redirect(lienErreur);
    });
});

// -- READ
app.get(lienGet, function (req, res) {
    console.log("Module: READ");

    mongoose.model('Module').findOne({id : req.params.id}).then((module)=>{
        if(module){
            res.render(pageModule, module);
        }else{
            res.status(404).json({message : "Inexistant"});
        }
    },(err)=>{
        res.redirect(lienErreur);
    });
});

module.exports = app;