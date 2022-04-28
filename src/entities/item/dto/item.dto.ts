import { IsUUID, IsString } from 'class-validator';
import { ApiResponseProperty, ApiProperty} from '@nestjs/swagger';
import { BaseDTO } from '../../base/dto/base.dto';
import { Item } from '../item.entity';
import { User } from 'src/entities/user/user.entity';

export class ItemDTO extends BaseDTO implements Readonly<ItemDTO> {
  @ApiResponseProperty()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  public static from(dto: Partial<ItemDTO>) {
    const it = new ItemDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    it.createDateTime = dto.createDateTime
    it.updateDateTime = dto.updateDateTime
    it.createdBy = dto.createdBy
    it.updateBy = dto.updateBy
    return it;
  }

  public static fromEntity(entity: Item) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createDateTime: entity.createDateTime,
      updateDateTime: entity.updateDateTime,
      createdBy: entity.createdBy,
      updateBy: entity.updatedBy,
    });
  }

  public toEntity(user: User = null) {
    const it = new Item();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createDateTime = new Date();
    it.createdBy = user ? user.id : null;
    it.updatedBy = user ? user.id : null;
    return it;
  }
}
