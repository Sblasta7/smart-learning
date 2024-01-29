const router = require('express').Router();
const {authMiddleware, isAdmin} = require('../middleware/authMiddleware');
const { create, findById, getAllPastPapers, updatePastPaper, deletePastPaper } = require('../controller/pastPaperController')


router.get('/', getAllPastPapers);

router.get('/:id', findById);

router.post('/create', authMiddleware, isAdmin, create);

router.put('/:id', authMiddleware, isAdmin, updatePastPaper);

router.delete('/:id', authMiddleware, isAdmin, deletePastPaper);

module.exports = router;

