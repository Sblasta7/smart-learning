const { findById, findAll, updateUser, deleteUser } = require('../controller/userController');

const router = require('express').Router();

router.get('/users', findAll);

router.get('/:id', findById);

router.put('/:id/update', updateUser);

router.delete('/:id/delete', deleteUser);

module.exports = router;