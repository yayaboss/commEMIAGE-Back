// ---- MANAGE DATABASE
let mongoose = require('mongoose');

let database  = mongoose.connect("mongodb://localhost/COMMEMIAGE",{
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true
});