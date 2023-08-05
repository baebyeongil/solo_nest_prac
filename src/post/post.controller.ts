import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
interface RequestWithLocals extends Request {
  locals: {
    user: number;
  };
}

@Controller('api')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/posts')
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get('/posts/:id')
  async getDetailPost(@Param('id') postId: number) {
    return await this.postService.getDetailPost(postId);
  }

  @Post('/post')
  async createPost(@Body() data: CreatePostDto, @Req() req: RequestWithLocals) {
    const userId = req.locals.user;
    await this.postService.createPost(userId, data.title, data.content);
    return {
      message: 'create successfully',
    };
  }

  @Put('/posts/:id')
  async updatePost(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
    @Req() req: RequestWithLocals,
  ) {
    const userId = req.locals.user;
    await this.postService.updatePost(userId, id, data.title, data.content);
    return {
      message: 'update successfully',
    };
  }

  @Delete('/posts/:id')
  async deletePost(@Param('id') postId: number, @Req() req: RequestWithLocals) {
    const userId = req.locals.user;
    await this.postService.deletePost(userId, postId);
    return {
      message: 'delete successfully',
    };
  }
}
