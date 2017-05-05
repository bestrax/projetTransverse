/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  admin_add: function(req, res) {
    if (req.method === 'POST') {
      Asso.findOne({id: req.param('associationId')}, function(err, asso){
        if (err || !asso)
          return res.view('admin/assos/addEvent', {err: err, form: req.body});

        req.body.asso = asso;

        Event.create(req.body, function (err, user) {
          if ((err) || (!user)) {
            return res.view('admin/assos/addEvent', {err: err, form: req.body});
          }

          res.redirect('/admin/assos/' + req.param('associationId'));

        });
      });
    }
    else
      return res.view('admin/assos/addEvent', {form: ''});
  },

  admin_delete: function(req, res) {
    Event.destroy({id: req.param('eventId')}, function(err) {
      res.redirect('/admin/assos/' + req.param('associationId'));
    });
  },

};

