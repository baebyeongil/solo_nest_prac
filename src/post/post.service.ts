import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getPosts() {
    return await this.postRepository.find({});
  }

  async getDetailPost(id: number) {
    await this.checkPost(id);

    return await this.postRepository.findOne({
      where: { id },
    });
  }

  async createPost(title: string, content: string) {
    await this.checkEmpty(title, content);

    await this.postRepository.insert({
      title,
      content,
    });
  }

  async updatePost(id: number, title: string, content: string) {
    await this.checkEmpty(title, content);

    await this.checkPost(id);

    return await this.postRepository.update(id, { title, content });
  }

  async deletePost(id: number) {
    await this.checkPost(id);

    return await this.postRepository.delete(id);
  }

  private async checkEmpty(title: string, content: string) {
    if (!title) {
      throw new NotFoundException(`Cannot found title.`);
    }
    if (!content) {
      throw new NotFoundException(`Cannot found content.`);
    }
  }

  private async checkPost(id: number) {
    if (!id) {
      throw new NotFoundException(`Cannot found id.`);
    }
    const post = await this.postRepository.findOne({
      where: {
        id,
      },
    });
    if (!post) {
      throw new NotFoundException(`Cannot found post.`);
    }
  }
}
