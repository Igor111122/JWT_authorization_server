const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service'); 

module.exports = function(req, res, next){
    try{
        const autorizationHeader = req.headers.authorization;
        if(!autorizationHeader){
            return next(ApiError.UnautorizedError());
        }
        const accesstoken = autorizationHeader.split(' ')[1];
        if(!accesstoken){
            return next(ApiError.UnautorizedError());
        }

        const userData = tokenService.validateAccessToken(accesstoken);
        if(!userData){
            return next(ApiError.UnautorizedError()); 
        }

        req.user = userData;
        next();
    }catch (e) {
        return next(ApiError.UnautorizedError());
    }

}