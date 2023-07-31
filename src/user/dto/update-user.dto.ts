import { PartialType } from '@nestjs/mapped-types';
import { loginUserDto } from './login-user.dto';

export class UpdateUserDto extends PartialType(loginUserDto) {}
