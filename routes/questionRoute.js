const router = require('express').Router();
const { create,  findById, getAllQuestions, updateQuestion, deleteQuestion, uploadImages } = require('../controller/questionController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middleware/uploadImages');

router.get('/', authMiddleware, getAllQuestions);

router.get('/:id', findById);

router.post('/create', authMiddleware, isAdmin, create);

router.put('/:id', authMiddleware, isAdmin, updateQuestion);

router.delete('/:id', authMiddleware, isAdmin, deleteQuestion);

//router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.single('img'), imgResize, uploadImages);

router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.single('img'), productImgResize, uploadImages);


// router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.single('avater'), (req, res, next) => {
//     console.log('Request object before imgResize:', req);
//     console.log('Request file:', req.body.avater);
//     console.log('Request file:', req.file);
//     console.log('Request file:', req.files);
//     res.json(res.files);
// });

module.exports = router;