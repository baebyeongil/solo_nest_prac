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
  getPosts() {
    return this.postService.getPosts();
  }

  @Get('/posts/:id')
  getDetailPost(@Param('id') postId: number) {
    return this.postService.getDetailPost(postId);
  }

  @Post('/articles')
  createPost(@Body() data: CreatePostDto): any {
    return this.postService.createPost(data.title, data.content);
  }

  @Put('/articles/:id')
  updatePost(@Param('id') postId: number, @Body() data: UpdatePostDto) {
    return this.postService.updatePost(postId, data.title, data.content);
  }

  @Delete('/articles/:id')
  deletePost(@Param('id') postId: number) {
    return this.postService.deletePost(postId);
  }
}
