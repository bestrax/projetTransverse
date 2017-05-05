/**
 * User.js
 *
 * @description :: Model for the app users
 * @docs        :: Not documented yet
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    firstName: {
      type: "string",
      required: true
    },
    lastName: {
      type: "string",
      required: true
    },
    mail: {
      type: "email",
      required: true
    },
    username: {
      type: "string",
      required: true
    },
    password: {
      type: "string",
      required: true
    },
    idFacebook: {
      type: "string"
    },
    tokenFacebook: {
      type: "string"
    },
    idLinkedin: {
      type: "string"
    },
    tokenLinkedin: {
      type: "string"
    },
    idViadeo: {
      type: "string"
    },
    tokenViadeo: {
      type: "string"
    },
    profilPicture: {
      model: "Media"
    },
    assos: {
      collection: 'asso',
      via: 'members'
    },
    // Delete the password from data
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  },

  // Create a hash for the password
  beforeCreate: function(user, callback) {
    bcrypt.genSalt(10, function(error, salt) {
      bcrypt.hash(user.password, salt, function(error, hash) {
        if(error) { // Deal with errors
          console.log(error);
          callback(error);
        } else {  // Update the user
          user.password = hash;
          callback(null, user);
        }
      })
    });
  }

};
