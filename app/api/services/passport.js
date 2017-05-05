var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

// Function to find an user with is ID
function findById(id, fn) {
  User.findOne(id).exec(function(err, user) {
    if(err) return fn(null, null);
    else return fn(null, user);
  });
}

// Function to find an user with is username
function findByUsername(name, fn) {
  User.findOne({username: name}).exec(function(err, user) {
    if(err) return fn(null, null);
    else return fn(null, user);
  });
}

// Passport sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// LocalStrategy for passport
passport.use(
  new LocalStrategy(function (username, password, done) {
    process.nextTick(function () {
      findByUsername(username, function (err, user) {
        if(err) return done(null, err);

        if(!user) return done(null, false, {
            message: 'Utlisateur inconnu ' + username
        });

        bcrypt.compare(password, user.password, function (err, res) {
          if(!res) return done(null, false, {
              message: 'Mot de passe incorect'
          });

          var returnUser = {
            username: user.username,
            createdAt: user.createdAt,
            id: user.id
          };

          return done(null, returnUser, {
            message: 'Connexion réussie'
          });

        });
      })
    });
  })
);
