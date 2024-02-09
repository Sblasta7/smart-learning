const router = require('express').Router();
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');
const { create, findById, getAllPastPapers, updatePastPaper, deletePastPaper, subjectQuery, getCreatePastPaper } = require('../controller/pastPaperController')


router.get('/create', authMiddleware, isAdmin, getCreatePastPaper);

router.get('/past-papers', authMiddleware, isAdmin, getAllPastPapers);

router.get('/', subjectQuery);

router.get('/:id', findById);

router.post('/create', authMiddleware, isAdmin, create);

router.put('/:id', authMiddleware, isAdmin, updatePastPaper);

router.delete('/:id', authMiddleware, isAdmin, deletePastPaper);

module.exports = router;

