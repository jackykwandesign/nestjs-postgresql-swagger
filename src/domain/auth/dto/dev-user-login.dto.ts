import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class DevUserLoginDTO{
    @ApiProperty({required:true})
    @IsEmail()
    email: string;
}