/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
const csv = require('csvtojson');

 module.exports = {

   homepage: function(req, res) {
     return res.view('homepage', {user: req.user});
   },

   front_login: function(req, res) {

     if (req.method === 'POST') {

       passport.authenticate('local', function (err, user, info) {
         if ((err) || (!user)) {
           return res.view('login', {err: err, user: req.user});
         }

         req.logIn(user, function (err) {
           if (err) return res.view('login', {err: err, user: req.user});
           res.redirect('/student/' + user.id);
         });

       })(req, res);
     }
     else if (req.isAuthenticated())
       res.redirect('/');
     else
       return res.view('login', {user: req.user});

   },

   front_logout: function (req,res){
     req.logout();
     return res.redirect('/');
   },

   front_register: function(req, res) {

     if (req.method === 'POST') {
       User.create(req.body, function (err, user) {
         if ((err) || (!user)) {
           return res.view('register', {err: err, user: req.user});
         }
         req.logIn(user, function (err) {
           if (err) return res.view('register', {err: err, user: req.user});
           res.redirect('/');
         });

       });
     }
     else if (req.isAuthenticated())
       res.redirect('/');
     else
       return res.view('register', {user: req.user});

   },

   front_profile: function(req, res) {

     if (req.method === 'POST' && req.isAuthenticated()) {
       User.update({id: req.user.id}, req.body, function (err, user) {
         if ((err) || (!user)) {
           return res.redirect('/login');
         }

         return res.redirect('/profile');
       });
     }
     else if (req.isAuthenticated()) {
       User.findOne({id: req.user.id}, function (err, user) {
         if ((err) || (!user)) {
           return res.redirect('/login');
         }

         return res.view('profile', {show: user, user: req.user});
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

       return res.view('students', {users: users, user: req.user});
     });
   },

   front_student: function(req, res) {
     User.findOne({id: req.param('studentId')}).populate('assos').exec(function (err, user) {
       if ((err) || (!user)) {
         return res.redirect('/students');
       }

       return res.view('student', {show: user, user: req.user});
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
   },

   admin_import: function (req, res) {

     if (req.method === 'POST') {
       csv({
         delimiter: ';'
       }).fromString(req.body.payload)
         .on('json',function (line) {

           User.findOne({mail: line['email'].toString('utf8')}, function(err, user) {

             if(typeof user == 'undefined' || typeof user.id == 'undefined') {
               User.create({
                 firstName: line['name'].toString('utf8').substr(0, line['name'].indexOf(' ')),
                 lastName: line['name'].toString('utf8').substr(line['name'].indexOf(' ')+1, line['name'].length - 1),
                 mail: line['email'].toString('utf8'),
                 username: line['name'].toString('utf8').substr(0, line['name'].indexOf(' ')),
                 password: line['name'].toString('utf8').substr(0, line['name'].indexOf(' ')),
               }).exec(function(err, created) {
               });
             }
           });

         })
         .on('done',function (error) {
           return res.redirect('/students/');
         });


     } else {
       return res.view('admin/import', {
         err: '',
         form: '',
         user: req.user,
       });
     }

   },

};
