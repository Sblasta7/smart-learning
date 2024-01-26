const { findById, getAllUsers, updateUser, deleteUser, blockUser, unBlockUser } = require('../controller/userController');
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');

const router = require('express').Router();

router.get('/users', getAllUsers);

router.get('/:id', authMiddleware, isAdmin, findById);

router.put('/edit-user', authMiddleware, updateUser);

router.delete('/:id', deleteUser);

router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);

router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);

module.exports = router;