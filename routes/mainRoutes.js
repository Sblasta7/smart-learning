const router = require('express').Router();


router.get('/', (req, res) =>{
    res.send('mainRoute')
});

module.exports = router; 