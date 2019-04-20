const express = require('express');
const router = express.Router();

const landing = require('../controllers/landing');

router.get('/', landing.get_landing);

router.post('/',landing.submit_lead);

router.get('/users', landing.show_users);

router.get('/user/:user_id',landing.show_user);

router.get('/user/:user_id/edit',landing.show_edit_user);

router.post('/user/:user_id/edit', landing.edit_user);

module.exports = router;
