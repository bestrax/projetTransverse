/**
 * AssoController
 *
 * @description :: Server-side logic for managing assoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: function(req, res) {
    Asso.find({}, function (err, assos) {
      if ((err) || (!assos)) {
        return res.redirect('/');
      }

      return res.view('assos', {assos: assos});
    });
  },

  view: function(req, res) {
    Asso.findOne({id: req.param('associationId')}).populate('members').populate('events').exec(function (err, asso) {
      if ((err) || (!asso)) {
        return res.redirect('/assos');
      }

      return res.view('assoView', {asso: asso});
    });
  },

  admin_list: function(req, res) {
    Asso.find({}, function (err, assos) {
      if ((err) || (!assos)) {
        return res.redirect('/admin');
      }

      return res.view('admin/assos/list', {assos: assos});
    });
  },

  admin_add: function(req, res) {
    if (req.method === 'POST') {
      Asso.create(req.body, function (err, created) {
        if ((err) || (!created)) {
          return res.view('admin/assos/add', {err: err, form: ''});
        }

        req.file('inputLogo').upload({
          maxBytes: 5000000
        },function whenDone(err, files) {
          if (err) {
            Asso.destroy({id: created.id}).exec(function () {
            });
            return res.view('admin/assos/add', {err: err, form: req.body});
          }

          if (files.length === 0) {
            Asso.destroy({id: created.id}).exec(function () {
            });
            return res.view('admin/assos/add', {err: 'Aucun logo n\'a été uploadé', form: req.body});
          }

          Media.create({
            name: files[0].fd
          }).exec(function (err, newFile) {
            if (err) {
              Asso.destroy({id: created.id}).exec(function(){});
              return res.view('admin/assos/add', {err: err, form: req.body});
            }

            Asso.update(created.id, {
              image: newFile,
            }).exec(function (err){
              if (err){
                Asso.destroy({id: created.id}).exec(function(){});
                Media.destroy({id: newFile.id}).exec(function(){});
                return res.view('admin/assos/add', { err: err, form: req.body});
              }

              res.redirect('/admin/assos');

            });

          });
        });

      });
    }
    else
      return res.view('admin/assos/add', {form: ''});
  },

  admin_edit: function(req, res) {
    if (req.method === 'POST') {

      req.file('inputLogo').upload({
        maxBytes: 5000000
      },function whenDone(err, files) {
        if (err) {
          return res.view('admin/assos/add', {err: err, form: req.body});
        }

        if (files.length === 0) {
          Asso.update({id: req.param('associationId')}, req.body, function (err, user) {
            if ((err) || (!user)) {
              return res.view('admin/assos/add', {err: err, form: ''});
            }

            res.redirect('/admin/assos');
          });
        } else {
          Media.create({
            name: files[0].fd
          }).exec(function (err, newFile) {
            if (err) {
              return res.view('admin/assos/add', {err: err, form: req.body});
            }

            req.body.image = newFile;
            Asso.update(req.param('associationId'), req.body).exec(function (err){
              if (err){
                Asso.destroy({id: created.id}).exec(function(){});
                Media.destroy({id: newFile.id}).exec(function(){});
                return res.view('admin/assos/add', { err: err, form: req.body});
              }

              res.redirect('/admin/assos');

            });
          });
        }


      });
    }
    else {
      Asso.findOne({id: req.param('associationId')}, function (err, asso) {
        if ((err) || (!asso)) {
          return res.redirect('/admin/assos');
        }

        return res.view('admin/assos/add', {form: asso});
      });
    }
  },

  admin_view: function(req, res) {
    Asso.findOne({id: req.param('associationId')}).populate('members').populate('events').exec(function (err, asso) {
      if ((err) || (!asso)) {
        return res.redirect('/admin/assos');
      }

      return res.view('admin/assos/view', {asso: asso});
    });
  },

  admin_delete: function(req, res) {
    Asso.findOne({id: req.param('associationId')}).populate('events').exec(function (err, asso) {
      if ((err) || (!asso)) {
        return res.redirect('/admin/assos');
      }

      if (asso.events != undefined) {
        for (let i = 0; i < asso.events.size; i++) {
          Event.destroy({id: asso.events[i].id}, function(){});
        }
      }

      Asso.destroy({id: asso.id}, function(){});

      return res.redirect('/admin/assos');
    });
  },

  admin_add_user: function(req, res) {
    if (req.param('userId') != undefined && req.param('userId').length > 0) {
      User.findOne({id: req.param('userId')}, function(err, user) {
        if ((err) || (!user)) {
          return res.redirect('/admin/assos/'+req.param('associationId'));
        }
        Asso.findOne({id: req.param('associationId')}).populate('members').exec(function (err, asso) {
          if ((err) || (!asso)) {
            return res.redirect('/admin/assos');
          }

          user.assos.push(asso);

          User.update({id: req.param('userId')}, user, function (err) {
            if ((err)) {
              return res.view('admin/assos', {});
            }

            res.redirect('/admin/assos/'+ asso.id);

          });
        });
      });

    }
    else {
      User.find({}, function (err, users) {
        if ((err) || (!users)) {
          return res.redirect('/');
        }

        return res.view('admin/assos/addStudent', {associationId: req.param('associationId'), users: users});
      });
    }
  },

  admin_delete_user: function(req, res) {
    if (req.param('userId') != undefined && req.param('userId').length > 0) {
      User.findOne({id: req.param('userId')}, function(err, user) {
        if ((err) || (!user)) {
          return res.redirect('/admin/assos/'+req.param('associationId'));
        }

        for (let i = 0; i < user.assos.size; i++) {
          if (user.assos[i].id == req.param('associationId')) {
            delete user.assos[i];
          }
        }

        User.update({id: req.param('userId')}, user, function (err) {
          if ((err)) {
            return res.view('admin/assos', {});
          }

          return res.redirect('/admin/assos/'+req.param('associationId'));

        });

      });

    }
    else {
      return res.redirect('/admin/assos/'+req.param('associationId'));
    }
  },

};
