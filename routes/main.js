var express = require('express');
var router = express.Router();

router.post('/', (req, res, next) => {
  try {
   const {id,password} = req.body;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
