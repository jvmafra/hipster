let jwt = require('jwt-simple');
let validateUser = require('../routes/auth').validateUser;

module.exports = (req, res, next) => {

  // When performing a cross domain request, you will receive
  // a pre-flighted request first. This is to check if our the app
  // is safe.

  let token = (req.body && req.body.access_token) ||
    (req.query && req.query.access_token) ||
    req.headers['x-access-token'];

  let key = (req.body && req.body.x_key) ||
    (req.query && req.query.x_key) ||
    req.headers['x-key'];

  if (token || key) {
    try {
      let decoded = jwt.decode(token, require('../config/secret.js')());

      if (decoded.exp <= Date.now()) {
        res.status(498);
        res.json({
          "status": 498,
          "message": "Token Expired"
        });
        return;
      }

      // Authorize the user to see if s/he can access our resources

      let dbUser = validateUser(key); // The key would be the logged in user's username
      if (dbUser) {
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }

    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};
