
import { ApiResponseProperty} from '@nestjs/swagger';
export class BaseDTO implements Readonly<BaseDTO> {
  @ApiResponseProperty()
  createDateTime: Date;

  @ApiResponseProperty()
  updateDateTime:Date

  @ApiResponseProperty()
  createdBy:string

  @ApiResponseProperty()
  updateBy:string
}
