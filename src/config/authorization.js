const DropError = require('../app/infrastruct/httpException')

const jwt = require('jsonwebtoken')
const authConfig = require('./auth.json')

module.exports = (req,resp,next)=>{
    const authHeader =  req.headers.authorization;
    //console.log(authHeader)

    if (!authHeader)
        DropError.error(resp, 401, 'No Token provided')
        
    const parts = authHeader.split(' ')

    if(!parts.length==2)
        DropError.error(resp, 401, 'Token error')

    const [barrer, token] = parts
    if(!/^barrer$/i.test(barrer))
        DropError.error(resp,401,'Token malformed')

    jwt.verify(token, authConfig.secret, (err, decoded)=>{
        if(err) DropError.error(resp,401,'Token invalid')
        req.userId = decoded.id
        next()
    })
}
