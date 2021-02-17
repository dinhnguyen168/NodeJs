const   jwt = require('jsonwebtoken'),
        config = require('config');

function authorize(req,res,next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');   

    try {
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        console.log('User Token: ',req.user);
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');        
    }
}

module.exports = authorize;