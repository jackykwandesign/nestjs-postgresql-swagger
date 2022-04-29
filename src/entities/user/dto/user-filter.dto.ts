import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UserFilterDTO{
    @ApiProperty({required:false})
    @IsOptional()
    email:string
}