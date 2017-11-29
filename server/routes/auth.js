import jwt from 'jwt-simple';
import { UsuarioService }  from '../service/UsuarioService';

var auth = {

 login: async (req, res) => {

   var username = req.body.username || '';
   var password = req.body.password || '';

   if (username == '' || password == '') {
     res.status(401);
     res.json({
       "status": 401,
       "message": "Invalid credentials"
     });
     return;
   }

   // Fire a query to your DB and check if the credentials are valid
   var dbUserObj = await auth.validate(username, password);

   if (!dbUserObj) { // If authentication fails, we send a 401 back
     res.status(401);
     res.json({
       "status": 401,
       "message": "Invalid credentials"
     });
     return;
   }

   if (dbUserObj) {
     res.json(genToken(dbUserObj));
   }

 },

 validate: function(username, password) {
   // spoofing the DB response for simplicity
   var dbUserObj = UsuarioService.authUser(username, password);

   return dbUserObj;
 },

 validateUser: function(username) {
   // spoofing the DB response for simplicity
   var dbUserObj = { // spoofing a userobject from the DB.
     name: 'admin',
     role: 'admin',
     username: 'admin'
   };

   return dbUserObj;
 }

}

// private method
function genToken(user) {
 var expires = expiresIn(7); // 7 days
 var token = jwt.encode({
   exp: expires,
   username: user.username
 }, require('../config/secret')());

 return {
   token: token,
   expires: expires,
   user: user
 };
}

function expiresIn(numDays) {
 var dateObj = new Date();
 return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;
