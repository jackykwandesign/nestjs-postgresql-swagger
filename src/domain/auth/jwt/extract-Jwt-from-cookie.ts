import { Request } from 'express'
// import { ExtractJwt } from 'passport-jwt';
export function ExtractJWTFromCookie(req:Request){
    var token = null;
    if (req && req.signedCookies) {
        // console.log("cookie", req.cookies)
        // console.log("signedCookies", req.signedCookies)
        token = req.signedCookies['jwt'] || req.cookies['jwt'];
        token = token === undefined ? null : token
    }
    return token;
}
export function ExtractJWTFromHttpHeader(req:Request){
    var token = null;
    if(req && req.headers.authorization){
        let authHeader = req.headers.authorization.split(" ");
        if(authHeader[0] === 'Bearer' && authHeader.length === 2){
            token = authHeader[1];
        }
    }
    return token;
}
export function ExtractJWTFromCookieOrBearer(req:Request){
    // console.log("ExtractJWTFromCookieOrBearer")
    let token = null;
    token = ExtractJWTFromCookie(req) || ExtractJWTFromHttpHeader(req);
    // console.log("jwt token: ", token)
    return token
}