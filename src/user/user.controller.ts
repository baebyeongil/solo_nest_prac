import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() data: loginUserDto) {
    const result = await this.userService.login(data.userId, data.password);
    return {
      message: 'login successfully / ' + result,
    };
  }

  @Post('/signup')
  async signup(@Body() data: CreateUserDto) {
    const result = await this.userService.signup(
      data.userId,
      data.name,
      data.password,
    );
    return {
      message: 'signup successfully / ' + result,
    };
  }
}
