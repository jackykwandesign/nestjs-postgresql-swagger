import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        if(!this.reflector){
            // console.log("no reflector")
            return true;
        }
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            // console.log("no roles")
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user:User = request.user;
        if(!user || !user.roles){
            return false;
        }
        // console.log('current user',user)
        // return true;
        return this.matchRoles(roles, user.roles);
        // return this.matchRoles(roles, 'user');
        // return this.matchRoles(roles, ['guest']);
    }
    matchRoles(authorizedRoles: string[], userRoles:string | string[]):boolean{
        // console.log("authorizedRoles", authorizedRoles)
        // console.log("userRoles", userRoles)
        if(typeof userRoles === 'string'){
            // console.log("string userRoles", userRoles)
            if(authorizedRoles.includes(userRoles)){
                // console.log('match role')
                return true;
            }
        }
        if(Array.isArray(userRoles)){
            // console.log("string Array", userRoles)
            if( authorizedRoles.some( role => userRoles.includes(role) ) ){
                // console.log('match role')
                return true;
            }
        }       
        // console.log('fail match role')
        throw new UnauthorizedException();
    }
}