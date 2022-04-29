import { Body, Controller, Get, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/entities/user/user.service';
import { DevUserLoginDTO } from './dto/dev-user-login.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('/devUserLogin')
  async devUserLogin(@Body() devUserLoginDTO: DevUserLoginDTO) {
    const usersResult = await this.userService.usersGetAll({
      email: devUserLoginDTO.email,
    });
    if (usersResult.length > 0) {
      const payload: JwtPayload = {
        userID: usersResult[0].id,
      };
      const token = await this.jwtService.sign(payload);
      return {
        token
      };
    }
    return new NotFoundException()
  }
}
