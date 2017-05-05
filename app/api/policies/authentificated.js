// Policy that will allow any authentificated user

module.exports = function(req, res, valid) {
  var isAuth = req.isAuthentificated();

  if(isAuth) return next();
  else return res.redirect("/login"); 
}
