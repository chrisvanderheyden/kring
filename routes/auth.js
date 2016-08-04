
var express = require('express'),
    passport =  require('passport'),
    router = express.Router();



router.get('/facebook', passport.authenticate('facebook',  { scope : ['public_profile', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { 
        successRedirect : '/deelnemen', 
        failureRedirect: '/login' 
    }),
  function(req, res) {

    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;
