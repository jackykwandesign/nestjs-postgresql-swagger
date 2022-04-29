// item.controller.ts

import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/domain/auth/decorators/get-user.decorator';
import { ItemDTO } from 'src/entities/item/dto/item.dto';
import { ItemService } from './item.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from 'src/domain/auth/jwt/jwt-auth.guard';
import { ItemFilterDTO } from './dto/item.filter.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('item')
export class ItemController {
  constructor(private serv: ItemService) {}

  @Get()
  public async itemsGetAll(
    @Query("itemFilterDTO") itemFilterDTO?: ItemFilterDTO
  ): Promise<ItemDTO[]> {
    // return await this.serv.getAll();
    const items = await this.serv.itemsGetAll(itemFilterDTO);
    console.log("items", items)
    return items.map((e) => ItemDTO.fromEntity(e));
  }

  @Get("fts")
  public async itemsGetAllFTS(
    @Query() itemFilterDTO?: ItemFilterDTO
  ): Promise<ItemDTO[]> {
    // return await this.serv.getAll();
    console.log("itemFilterDTO", itemFilterDTO)
    const items = await this.serv.itemsGetAllFTS(itemFilterDTO);
    console.log("items", items)
    return items.map((e) => ItemDTO.fromEntity(e));
  }

  @Post()
  public async itemCreate(
    @GetUser() user: User,
    @Body() dto: ItemDTO,
  ): Promise<ItemDTO> {
    const result = await this.serv.itemCreate(dto, user);
    return ItemDTO.fromEntity(result);
  }

  @Delete(":itemId")
  public async itemDeleteById(
    @GetUser() user: User,
    @Param("itemId", new ParseUUIDPipe({version:"4"})) itemId:string
  ): Promise<ItemDTO> {
    const result = await this.serv.itemDeleteById(itemId, user)
    return ItemDTO.fromEntity(result);
  }
}
