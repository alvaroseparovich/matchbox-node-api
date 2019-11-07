module.exports = (response, resp)=>{

        if(!!response.error){
            return resp.status(response.status).send( exMsg( response.error.message ) );
        }
        return resp.send(response);
}