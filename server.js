// ---- MANAGE DATABASE
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

mongoose.connect("mongodb://localhost/COMEMIAGE",{
    useNewUrlParser: true
}).then(() => {
    console.log('BDD: Connected')
}).catch(e => {
    console.log('BDD: Error connection');
    console.log(e);
});

const app = express();

//Body Parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/adminstrateurs',require('./routes/AdminstrateurRoute'));
app.use('/apprenants',require('./routes/ApprenantRoute'));
app.use('/evaluations',require('./routes/EvaluationRoute'));
app.use('/filieres',require('./routes/FiliereRoute'));
app.use('/modules',require('./routes/ModuleRoute'));
app.use('/semestres',require('./routes/SemestreRoute'));
app.use('/suivis',require('./routes/SuiviRoute'));
app.use('/tuteurs',require('./routes/TuteurRoute'));
app.use('/utilisateurs',require('./routes/UtilisateurRoute'));

app.listen(3010);