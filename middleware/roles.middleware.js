const rolesValidation = (roles) => (req, res, next) => { // roles -> ['Admin', 'User']
  // let aux = false;
  // roles.forEach((role) => { // role -> 'Admin' | role -> 'User'
  //   if (req.session.user.role === role) { // User === Admin | User === User
  //     aux = true
  //   }
  // });

  // if (aux) {
  //   next();
  // } else {
  //   res.render('not-found');
  // }
  if (req.session.currentUser && roles.includes(req.session.currentUser.role)) {
    next();
  } else {
    res.render('not-found');
  }
};

module.exports = rolesValidation

