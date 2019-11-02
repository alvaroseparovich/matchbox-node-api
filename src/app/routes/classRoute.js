module.exports = class route {
    constructor(){}
    
    get(request,response){
        response.send(`GET - ${request.url} \n`);
    }
}