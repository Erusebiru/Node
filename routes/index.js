const express = require('express');
const router = express.Router();

const landing = require('../controllers/landing');

router.get('/', landing.get_landing);

router.post('/',landing.submit_lead);

router.get('/users', landing.show_users);

router.get('/user/:user_id',landing.show_user);

module.exports = router;
