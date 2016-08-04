
var express = require('express'),
    passport =  require('passport'),
    router = express.Router();


// facebook authentication 
router.get('/facebook', passport.authenticate('facebook',  { scope : ['public_profile', 'email'] }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { 
        successRedirect : '/deelnemen', 
        failureRedirect: '/login' 
    }),
  function(req, res) {

    res.redirect('/');
  });


//google authentication 
 router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// the callback after google has authenticated the user
router.get('/google/callback',
        passport.authenticate('google', {
                successRedirect : '/deelnemen',
                failureRedirect : '/'
        }));



router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



module.exports = router;
