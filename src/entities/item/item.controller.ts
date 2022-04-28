// item.controller.ts

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/domain/auth/decorators/get-user.decorator';
import { ItemDTO } from 'src/entities/item/dto/item.dto';
import { ItemService } from './item.service';
import {ApiBearerAuth} from "@nestjs/swagger"
import { User } from '../user/user.entity';
import { JwtAuthGuard } from 'src/domain/auth/jwt/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('item')
export class ItemController {
  constructor(private serv: ItemService) {}

  @Get()
  public async getAll(): Promise<ItemDTO[]> {
    return await this.serv.getAll();
  }

  @Post()
  public async post(
    @GetUser() user: User,
    @Body() dto: ItemDTO,
  ): Promise<ItemDTO> {
    return this.serv.create(dto, user);
  }
}
