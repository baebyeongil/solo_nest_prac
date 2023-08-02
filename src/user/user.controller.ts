import { Body, Controller, Post, Put, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(
    @Body() data: loginUserDto,
    @Response({ passthrough: true }) res,
  ) {
    const token = await this.userService.login(data.userId, data.password);
    res.cookie('Authentication', 'Bearer ' + token);
    return {
      message: 'login successfully ' + token,
    };
  }

  @Post('/signup')
  async signup(@Body() data: CreateUserDto) {
    const token = await this.userService.signup(
      data.userId,
      data.name,
      data.password,
    );
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
