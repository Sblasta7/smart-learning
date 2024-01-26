const { createUser, loginUser, handleRefreshToken, logout} = require('../controller/authController');

const router = require('express').Router();

router.post('/register', createUser)

router.post('/login', loginUser)

router.get('/refresh-token', handleRefreshToken)

router.get('/logout', logout)

module.exports = router;