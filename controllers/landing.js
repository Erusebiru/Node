
const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' });
}

exports.submit_lead = function(req,res,next){
    return models.User.create({
        nombre: req.body.nombre
    }).then(user => {
        res.redirect('/');
    });
}