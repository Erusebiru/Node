
const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' });
}

exports.submit_lead = function(req,res,next){
    return models.User.create({
        nombre: req.body.nombre
    }).then(user => {
        res.redirect('/users');
    });
}

exports.show_users = function(req,res,next){
    models.User.findAll().then(users => {
        res.render('landing', {title:'Express',users: users});
    })
}

exports.show_user = function(req,res,next){
    return models.User.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(user => {
        res.render('user', { user: user });
    })
}

exports.show_edit_user = function(req,res,next){
    return models.User.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(user => {
        res.render('user/edit_user', { user: user });
    });
}

exports.edit_user = function(req,res,next){
    return models.User.update({
        nombre: req.body.nombre
    }, {
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.redirect('/user/' + req.params.user_id);
    });
}

exports.delete_user = function(req,res,next){
    return models.User.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.redirect('/users');
    })
}