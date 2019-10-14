var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
  try {
    const data = req.user;
    res.render('main',{data:data});
  } catch (error) {
    next(error);
  }
});



module.exports = router;
