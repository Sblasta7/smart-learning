const router = require('express').Router();


router.get('/', (req, res) =>{
    //const token = req.cookies.jwt;
    res.render('index');//,{
    //     data:{
    //         token
    //     }
    // });
}
);

module.exports = router; 