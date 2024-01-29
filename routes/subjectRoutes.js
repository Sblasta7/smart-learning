const router = require('express').Router();
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');
const { create, getAllSubjects, getSubjectById, updateSubject, deleteSubject } = require('../controller/subjectController')


router.get('/', authMiddleware, isAdmin, getAllSubjects);

router.get('/:id', authMiddleware, isAdmin, getSubjectById)

router.post('/create', authMiddleware, isAdmin, create);

router.put('/:id', authMiddleware, isAdmin, updateSubject);

router.delete('/:id', authMiddleware, isAdmin, deleteSubject);

module.exports = router;