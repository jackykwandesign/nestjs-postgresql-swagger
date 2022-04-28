import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "./jwt-payload.interface";
import { Strategy } from "passport-jwt";
import { ExtractJWTFromCookieOrBearer } from "./extract-Jwt-from-cookie";

// import { UserService } from "src/entities/base/user/user.service";
import { User } from "src/entities/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        // private readonly userService:UserService,
    ){
        super({
            jwtFromRequest: ExtractJWTFromCookieOrBearer,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }
    
    async validate(payload:JwtPayload):Promise<User>{
        console.log('jwtStrategy payload',payload)
        const { userID } = payload;
        // const result = await this.userService.userGetOne({userID})
        const result = {data:undefined}
        // console.log("found", found)
        if(!result.data){
            console.log('user not found in jwt')
            throw new UnauthorizedException();
        }
        return result.data;
    }
}