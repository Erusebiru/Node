
const models = require('../models');

exports.get_landing = function(req, res, next) {
    res.render('landing', { title: 'Express' });
}

exports.submit_task = function(req,res,next){
    models.Task.create({
        "estado": req.body.estado,
        "tarea": req.body.tarea
    },{
        attributes: {include: ['estado','tarea']}
    }).then(task => {
        res.send(task);
    });
}

exports.show_tasks = function(req,res,next){
    models.Task.findAll().then(tasks => {
        res.render('landing', {tasks: tasks});
    })
}

exports.show_task = function(req,res,next){
    return models.Task.findOne({
        where: {
            id: req.params.task_id
        }
    }).then(task => {
        res.render('task', { task: task });
    })
}

exports.show_edit_task = function(req,res,next){
    return models.User.findOne({
        where: {
            id: req.params.task_id
        }
    }).then(task => {
        res.render('task/edit_task', { task: task });
    });
}

exports.edit_task = function(req,res,next){
    return models.Task.update({
        nombre: req.body.tarea,
        estado: req.body.estado
    }, {
        where: {
            id: req.params.task_id
        }
    }).then(result => {
        res.redirect('/task/' + req.params.task_id);
    });
}

exports.delete_task = function(req,res,next){
    return models.Task.destroy({
        where: {
            id: req.params.task_id
        }
    }).then(result => {
        res.redirect('/tasks');
    })
}

exports.update_task = function(req,res,next){
    return models.Task.update({
        estado: req.body.estado
    }, {
        where: {
            id: req.params.task_id
        }
    });
}