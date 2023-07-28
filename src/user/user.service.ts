import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(userId: string, password: number) {
    await this.isEmpty(userId, password);

    const user = await this.isAuth(userId);

    if (user.password !== password) {
      throw new UnauthorizedException(`User password is not correct.`);
    }

    const payload = { id: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async signup(userId: string, name: string, password: number) {
    if (!name) {
      throw new NotFoundException(`Cannot found name.`);
    }

    await this.isEmpty(userId, password);

    const insertResult = await this.userRepository.insert({
      userId,
      name,
      password,
    });

    const payload = { id: insertResult.identifiers[0].id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async isAuth(userId: string) {
    if (!userId) {
      throw new NotFoundException(`Cannot found userId.`);
    }

    const user = await this.userRepository.findOne({
      where: { userId },
      select: ['password'],
    });

    if (!user) {
      throw new NotFoundException(`Cannot found user.`);
    }

    return user;
  }

  async isEmpty(userId: string, password: number) {
    if (!userId) {
      throw new NotFoundException(`Cannot found userId.`);
    }

    if (!password) {
      throw new NotFoundException(`Cannot found password.`);
    }
  }
}
