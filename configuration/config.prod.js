module.exports={

   "facebookAuth" : {
        'clientID'      : '144176299321843', // your App ID
        'clientSecret'  : '46b353e3c841263a071abb90e4143e87', // your App Secret
        'callbackURL'   : 'https://kring.herokuapp.com/auth/facebook/callback'
    },

    "twitterAuth" : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'https://kring.herokuapp.com/auth/twitter/callback'
    },

    "googleAuth" : {
        'clientID'      : '586097552529-5dtmraq6mbpo2n9rqjgr9ri9rv0ehi6q.apps.googleusercontent.com',
        'clientSecret'  : 'Mecvbdy34jvxNymIfntGB5g8',
        'callbackURL'   : 'https://kring.herokuapp.com/auth/google/callback'
    },

  "use_database"          :     "false",
  "mongodb"               :     "mongodb://localhost/test"
}