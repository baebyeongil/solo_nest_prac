import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
  async createPost(@Body() data: CreatePostDto) {
    await this.postService.createPost(data.title, data.content);
    return {
      message: 'create successfully',
    };
  }

  @Put('/posts/:id')
  async updatePost(@Param('id') postId: number, @Body() data: UpdatePostDto) {
    await this.postService.updatePost(postId, data.title, data.content);
    return {
      message: 'update successfully',
    };
  }

  @Delete('/posts/:id')
  async deletePost(@Param('id') postId: number) {
    await this.postService.deletePost(postId);
    return {
      message: 'delete successfully',
    };
  }
}
