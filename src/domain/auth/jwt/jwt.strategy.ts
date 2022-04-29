import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "./jwt-payload.interface";
import { Strategy } from "passport-jwt";
import { ExtractJWTFromCookieOrBearer } from "./extract-Jwt-from-cookie";
import { User } from "src/entities/user/user.entity";
import { UserService } from "src/entities/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly userService:UserService,
    ){
        super({
            jwtFromRequest: ExtractJWTFromCookieOrBearer,
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }
    
    async validate(payload:JwtPayload):Promise<User>{
        try {
            const { userID } = payload;
            const result = await this.userService.userGetById(userID)
            if(!result){
                throw new UnauthorizedException();
            }
            return result;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
}