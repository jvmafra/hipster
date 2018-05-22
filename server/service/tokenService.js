import jwt from 'jwt-simple';

var token = {

    getUsername: (req) => {                
        token = req.headers['x-access-token'];        
        
        var decoded = jwt.decode(token, require('../config/secret.js')());        
        return(decoded.username)
    }

}

module.exports = token;