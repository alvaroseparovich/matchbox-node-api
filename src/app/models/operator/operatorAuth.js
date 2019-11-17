const Schema = require('../schema/schemaCandidates');
const exMsg = require('../../infrastruct/exceptionMessage');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authJson = require('../../../config/auth')

module.exports = class OperatorCandidates{


    static async routeAuth(req,resp,next){
        next( await this.auth(req.body.email, req.body.password))
    }


    static async auth(email, password){
        
        try{

            if(!password)   return exMsg('Password is required',400)
            if(!email)      return exMsg('Email is required', 400)

            const user =  await Schema.findOne({email}).select('+password')

            if (!user)      return exMsg('Usr not found',400)

            if(!await bcrypt.compare(password, user.password))
                return exMsg('Invalid Password',400)
            
            user.password = undefined
            
            const token = jwt.sign({id:user.id},authJson.secret, {expiresIn:86400})
            return {user,token};

        }catch(err){
            console.log(err)
            return exMsg(err,500);
        }


    }
}