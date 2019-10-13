var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  try {
    const message = req.flash('Error');
    res.render('index', { message: message&&message});
  } catch (error) {
    next(error);
  }
});

router.get('/signup', (req, res, next) => {
  try {
    res.render('signup');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
