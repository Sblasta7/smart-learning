const { createUser, loginUser, loginAdmin, handleRefreshToken, logout, getSignUp, getSignIn, getLoginAdmin} = require('../controller/authController');

const router = require('express').Router();



router.get('/sign-up', getSignUp);

router.get('/sign-in', getSignIn); 

router.get('/admin-login', getLoginAdmin);

router.post('/register', createUser);

router.post('/login', loginUser);

router.post('/admin-login', loginAdmin);

router.get('/refresh-token', handleRefreshToken);

router.get('/logout', logout);

module.exports = router;