/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var passport = require('passport');

 module.exports = {

   front_login: function(req, res) {

     if (req.method === 'POST') {

       passport.authenticate('local', function (err, user, info) {
         if ((err) || (!user)) {
           return res.view('login', {err: err});
         }

         req.logIn(user, function (err) {
           if (err) return res.view('login', {err: err});
           res.redirect('/profile');
         });

       })(req, res);
     }
     else if (req.isAuthenticated())
       res.redirect('/');
     else
       return res.view('login');

   },

   front_register: function(req, res) {

     if (req.method === 'POST') {
       User.create(req.body, function (err, user) {
         if ((err) || (!user)) {
           return res.view('register', {err: err});
         }
         req.logIn(user, function (err) {
           if (err) return res.view('register', {err: err});
           res.redirect('/');
         });

       });
     }
     else if (req.isAuthenticated())
       res.redirect('/');
     else
       return res.view('register');

   },

   front_profile: function(req, res) {

     if (req.method === 'POST' && req.isAuthenticated()) {
       User.update(req.user, req.body, function () {
         User.findOne({id: req.user.id}, function (err, user) {
           if ((err) || (!user)) {
             return res.redirect('/login');
           }

           return res.view('profile', {user: user});
         });
       });
     }
     else if (req.isAuthenticated()) {
       User.findOne(req.user, function (err, user) {
         if ((err) || (!user)) {
           return res.redirect('/login');
         }

         return res.view('profile', {user: user});
       });
     }
     else
       return res.redirect('/login');

   },

   front_students: function(req, res) {
     User.find({}, function (err, users) {
       if ((err) || (!users)) {
         return res.redirect('/');
       }

       return res.view('students', {users: users});
     });
   },

   front_student: function(req, res) {
     User.findOne({id: req.param('studentId')}, function (err, user) {
       if ((err) || (!user)) {
         return res.redirect('/students');
       }

       return res.view('student', {user: user});
     });
   },


   login: function (req, res) {
     res.view();
   },
   process: function(req, res){
     passport.authenticate('local', function(err, user, info) {
       if((err) || (!user)) {
         return res.send({
           authSuccess: false,
           message: 'Echec d\'identification'
         });
       }
       req.logIn(user, function(err) {
         if(err) res.send(err);
         return res.send({
           authSuccess: true,
           message: 'Identification réussie'
         });
       });
     })(req, res);
   },
   logout: function (req,res){
     req.logout();
     res.send({
       logoutSuccess: true,
       message: 'Déconnexion réussie'
     });
   }

};
