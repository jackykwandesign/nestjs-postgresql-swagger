
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/entities/user/user.entity";

let guest:Partial<User> = {
    id:"guest-uuid",
    email:"guest@guest.com"
}
export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User | Partial<User> => {
    const req = ctx.switchToHttp().getRequest();

    if(req.user !== undefined){
        return req.user;
    }else{
        return guest
    }
    // return guest
    
});