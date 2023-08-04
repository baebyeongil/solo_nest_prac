import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class loginUserDto extends PickType(CreateUserDto, [
  'loginId',
  'password',
] as const) {}
