const jwt = require('jsonwebtoken');
const config = require('config');

function authorize(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split('Bearer ')[1];

        if (!bearer)
            return res.status(403).send('Access denied - No token provided');

        let decoded = jwt.verify(bearer, config.get('jwtkey'));
            if (decoded) 
                next();
            else {
                res.status(403).send('Access denied - No token provided');
            }
    } else {
        res.status(403).send('Access denied - No token provided');
    }
}

module.exports = authorize;