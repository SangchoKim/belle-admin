var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    res.render('index', { title: 'Express' });
  } catch (error) {
    next(error);
  }
  
});

module.exports = router;
