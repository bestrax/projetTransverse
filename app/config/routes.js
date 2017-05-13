/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    controller: 'UserController',
    action: 'homepage',
    locals: {
      layout: 'layout'
    }
  },

  '/login': {
    controller: 'UserController',
    action: 'front_login',
    locals: {
      layout: 'layout'
    }
  },

  '/logout': {
    controller: 'UserController',
    action: 'front_logout',
    locals: {
      layout: 'layout'
    }
  },

  '/register': {
    controller: 'UserController',
    action: 'front_register',
    locals: {
      layout: 'layout'
    }
  },

  '/profile': {
    controller: 'UserController',
    action: 'front_profile',
    locals: {
      layout: 'layout'
    }
  },

  '/students': {
    controller: 'UserController',
    action: 'front_students',
    locals: {
      layout: 'layout'
    }
  },

  '/student/:studentId': {
    controller: 'UserController',
    action: 'front_student',
    locals: {
      layout: 'layout'
    }
  },

  '/assos': {
    controller: 'AssoController',
    action: 'list',
    locals: {
      layout: 'layout'
    }
  },

  '/assos/:associationId': {
    controller: 'AssoController',
    action: 'view',
    locals: {
      layout: 'layout'
    }
  },

  '/media/:id': {
    controller: 'MediaController',
    action: 'get',
  },





  '/admin/assos': {
    controller: 'AssoController',
    action: 'admin_list',
    locals: {
      layout: 'layout'
    }
  },
  '/admin/assos/add': {
    controller: 'AssoController',
    action: 'admin_add',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/edit/:associationId': {
    controller: 'AssoController',
    action: 'admin_edit',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/delete/:associationId': {
    controller: 'AssoController',
    action: 'admin_delete',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/:associationId': {
    controller: 'AssoController',
    action: 'admin_view',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/:associationId/add/?(:userId)?': {
    controller: 'AssoController',
    action: 'admin_add_user',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/:associationId/delete/:userId': {
    controller: 'AssoController',
    action: 'admin_delete_user',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/:associationId/event/add': {
    controller: 'EventController',
    action: 'admin_add',
    locals: {
      layout: 'layout'
    }
  },

  '/admin/assos/:associationId/event/delete/:eventId': {
    controller: 'EventController',
    action: 'admin_delete',
    locals: {
      layout: 'layout'
    }
  },
  '/admin/user/import': {
    controller: 'UserController',
    action: 'admin_import',
    locals: {
      layout: 'layout'
    }
  },

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  '/api/register' : {
    controller: 'UserController',
    action: 'register'
  },
  '/api/login': {
    controller: 'UserController',
    action: 'login'
  },
  '/api/logout': {
    controller: 'UserController',
    action: 'logout'
  }

};
