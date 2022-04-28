import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { UserRole } from '../enum/user-role.enum';

export class UserRoleValidationPipe implements PipeTransform {
  readonly allowStatuses = [UserRole.ADMIN, UserRole.NORMAL];
  transform(value: any, metaData: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(`User Role not exist`);
    }
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid user role`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowStatuses.indexOf(status);
    return index !== -1;
  }
}
