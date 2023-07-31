import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() data: loginUserDto) {
    await this.userService.login(data.userId, data.password);
    return {
      message: 'login successfully',
    };
  }

  @Post('/signup')
  async signup(@Body() data: CreateUserDto) {
    await this.userService.signup(data.userId, data.name, data.password);
    return {
      message: 'signup successfully',
    };
  }

  @Put('/updateUser')
  async updateUser(@Body() data: UpdateUserDto) {
    await this.userService.updateUser(data.userId, data.password);
    return {
      message: 'update successfully',
    };
  }
}
