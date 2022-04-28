import { IsString } from 'class-validator';
import { ApiResponseProperty, ApiProperty} from '@nestjs/swagger';
import { BaseDTO } from '../../base/dto/base.dto';
import { User } from '../user.entity';
import { UserRole } from '../enum/user-role.enum';
import { UserStatus } from '../enum/user-status.enum';

export class UserSafeDTO extends BaseDTO implements Readonly<UserSafeDTO> {
  @ApiResponseProperty()
  id: string;

  @ApiProperty({ required: true })
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;

  @ApiResponseProperty({
    enum: UserRole,
    type: [UserRole],
  })
  roles:UserRole[]

  @ApiResponseProperty({
    enum: UserStatus,
  })
  status:UserStatus

  public static from(dto: Partial<UserSafeDTO>) {
    const it = new UserSafeDTO();
    it.id = dto.id;
    it.email = dto.email;
    it.status = dto.status
    it.roles = dto.roles
    it.createDateTime = dto.createDateTime
    it.updateDateTime = dto.updateDateTime
    it.createdBy = dto.createdBy
    it.updateBy = dto.updateBy
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      ...entity
    });
  }

  public toEntity(user: User = null) {
    const it = new User();
    it.id = this.id;
    it.email = this.email;
    it.createDateTime = new Date();
    it.createdBy = user ? user.id : null;
    it.updatedBy = user ? user.id : null;
    return it;
  }
}
