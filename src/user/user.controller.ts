import {
  Body,
  Controller,
  Post,
  Put,
  Res,
  Req,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
interface RequestWithLocals extends Request {
  locals: {
    user: number;
  };
}

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/users')
  async findAllUser() {
    return await this.userService.findAllUser();
  }

  @Get('/users/:id')
  async findOneUser(
    @Param('id') selecId: number,
    @Req() req: RequestWithLocals,
  ) {
    const id = req.locals.user;
    return await this.userService.findOneUser(id, selecId);
  }

  @Post('/login')
  async login(
    @Body() data: loginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.login(data.userId, data.password);
    res.cookie('Authentication', 'Bearer ' + token);
    return {
      message: 'login successfully ' + token,
    };
  }

  @Post('/signup')
  async signup(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.userService.signup(
      data.userId,
      data.name,
      data.password,
    );
    res.cookie('Authentication', 'Bearer ' + token);
    return {
      message: 'signup successfully',
    };
  }

  @Put('/updateUser/:id')
  async updateUser(
    @Param('id') selecId: number,
    @Body() data: UpdateUserDto,
    @Req() req: RequestWithLocals,
  ) {
    const id = req.locals.user;
    await this.userService.updateUser(id, selecId, data.name, data.password);
    return {
      message: 'update successfully',
    };
  }

  @Post('/logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication');
    console.log('test');
    return { message: 'logout successfully' };
  }

  @Delete('/deleteUser/:id')
  async deleteUser(
    @Param('id') selecId: number,
    @Req() req: RequestWithLocals,
  ) {
    const id = req.locals.user;
    await this.userService.deleteUser(id, selecId);
    return { message: 'Delete successfully' };
  }
}
