const express = require('express');
const router = express.Router();

const landing = require('../controllers/landing');

router.get('/Node/', landing.get_landing);

router.post('/Node/task/create',landing.submit_task);

router.get('/Node/tasks', landing.show_tasks);

router.get('/task/:task_id',landing.show_task);

router.get('/task/:task_id/edit',landing.show_edit_task);

router.post('/task/:task_id/edit', landing.edit_task);

router.post('/task/:task_id/delete', landing.delete_task);

router.post('/task/:task_id/update', landing.update_task);

module.exports = router;
