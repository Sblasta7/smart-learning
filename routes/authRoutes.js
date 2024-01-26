const { createUser, loginUser } = require('../controller/userController');

const router = require('express').Router();

router.post('/register', createUser)

router.post('/login', loginUser)

module.exports = router;