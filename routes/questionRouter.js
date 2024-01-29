const router = require('express').Router();
const { create,  findById, getAllQuestions, updateQuestion, deleteQuestion } = require('../controller/questionController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getAllQuestions);

router.get('/:id', findById);

router.post('/create', authMiddleware, isAdmin, create);

router.put('/:id', authMiddleware, isAdmin, updateQuestion);

router.put('/:id', authMiddleware, isAdmin, deleteQuestion);

router


module.exports = router;