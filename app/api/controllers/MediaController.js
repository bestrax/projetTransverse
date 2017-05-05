/**
 * MediaController
 *
 * @description :: Server-side logic for managing Media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  get: function (req, res){

    req.validate({
      id: 'string'
    });

    Media.findOne(req.param('id')).exec(function (err, media){
      if (err) return res.negotiate(err);
      if (!media) return res.notFound();

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk(/* optional opts */);

      // set the filename to the same file as the user uploaded
      res.set("Content-disposition", "attachment; filename='download'");

      // Stream the file down
      fileAdapter.read(media.name)
        .on('error', function (err){
          return res.serverError(err);
        })
        .pipe(res);
    });
  }
};

