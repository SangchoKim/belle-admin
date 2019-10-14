const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middleware');
const {User} = require('../models');

const router = express.Router();

router.post('/signup',isNotLoggedIn, async(req, res, next)=>{
  const {email,password,name}= req.body;
  console.log(User);
  try {
    const exUser = await User.findOne({where:{email}});
    if(exUser){
      req.flash('Error','Email exist');
      return res.redirect('/signup');
    }
    const hash = await bcrypt.hash(password,12);
    await User.create({
      email,
      name,
      password:hash,
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});



router.post('/login', isNotLoggedIn ,(req, res, next) => {
  try {
   passport.authenticate('local',(authError,user,info)=>{
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      req.flash('Error',info.message);
      return res.redirect('/');
    }
    
    return req.login(user,(loginError) => {
      if(loginError){
        console.log(loginError);
        return next(loginError);
      }
      return res.redirect('/main');
    });
   })(req,res,next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
