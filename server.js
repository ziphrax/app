var express = require('express')
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    menuItem = require('./models/menuItem'),
    port = 80;


    mongoose.connect('mongodb://localhost/seeiftsticks');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));

app.use('/', express.static('www'));

app.get('/menu', function (req, res) {
    var allergens = req.query.allergens ? req.query.allergens.split(',') : [];
    menuItem.find({ 'ingredients': { $nin: allergens },'status':'available'}).exec(function (err, docs) {
        if (err) res.status(500).json(err);
        res.json(docs);
    });
});

app.get('/menuItem/new', function (req, res) {
    var ingredients = req.query.ingredients ? req.query.ingredients.split(',') : [];

    var newItem = new menuItem({
        name: req.query.name,
        description: req.query.description,
        price: req.query.price,
        ingredients: ingredients,
        status: req.query.status
    });

    newItem.save(function (err, doc) {
        if (err) res.status(500).json(err);
        res.json(doc);
    });
});

app.listen(port, function () {
    console.log('app listening on port %s',port);
});