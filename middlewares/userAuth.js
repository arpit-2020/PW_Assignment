const cookie = require('cookie');
const jwt = require('jsonwebtoken')
const user = require('../user.js')

module.exports.Validate = function(req, res, next) {
    if(req.body.password == user.password){
        console.log('validation successfull');
        next();
    }
    else{
        res.status(200).send({success:false, msg:"enter valid credentials"})
        console.log('validation failed');
    }
}
module.exports.validateToken = function (req, res, next) {
    // Get the cookies from the request headers
    const cookies = req.headers.cookie || '';
  
    // Parse the cookies into an object
    const parsedCookies = cookie.parse(cookies);
  
    // Check if the 'user' cookie exists
    if (parsedCookies.user) {
      const userToken = JSON.parse(parsedCookies.user).token;
     
      // Verify the token using JWT and your secret key
      jwt.verify(userToken, 'PW', (err, decoded) => {
        if (err) {
          // Token is invalid or expired, you can handle this as needed
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        // Token is valid; you can access the decoded user data in `decoded`
        req.user = decoded;
        console.log('Token is Authenticated')
        next(); // Move to the next middleware or route handler
      });
    } else {
      // 'user' cookie is not present; handle this as needed
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }