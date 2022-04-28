// user.controller.ts

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/domain/auth/decorators/get-user.decorator';
import { UserSafeDTO } from 'src/entities/user/dto/user.dto';
import { UserService } from './user.service';
import {ApiBearerAuth} from "@nestjs/swagger"
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/domain/auth/jwt/jwt-auth.guard';

// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private serv: UserService) {}

  @Get()
  public async getAll(): Promise<UserSafeDTO[]> {
    return await this.serv.getAll();
  }

  @Post()
  public async post(
    @GetUser() user: User,
    @Body() dto: UserSafeDTO,
  ): Promise<UserSafeDTO> {
    return this.serv.create(dto, user);
  }
}
