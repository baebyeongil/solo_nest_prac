import {
  ForbiddenException,
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

  // user 전체 조회
  async findAllUser() {
    return await this.userRepository.find();
  }

  // user 상세 조회
  async findOneUser(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name'],
    });
  }

  // 로그인
  async login(loginId: string, password: number) {
    if (!loginId) {
      throw new NotFoundException(`Cannot found userId.`);
    }

    const user = await this.userRepository.findOne({
      where: { loginId },
      select: ['id', 'name', 'password'],
    });

    if (!user) {
      throw new NotFoundException(`Cannot found user.`);
    }
    if (user.password !== password) {
      throw new UnauthorizedException(`User password is not correct.`);
    }

    const payload = { id: user.id, name: user.name };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, user };
  }

  // 회원가입
  async signup(loginId: string, name: string, password: number) {
    if (!loginId) {
      throw new NotFoundException(`Cannot found userId.`);
    }

    await this.isEmpty(name, password);

    const insertResult = await this.userRepository.insert({
      loginId,
      name,
      password,
    });

    const payload = { id: insertResult.identifiers[0].id, name: name };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, name };
  }

  // 유저 정보 수정
  async updateUser(
    id: number,
    selecId: number,
    name: string,
    password: number,
  ) {
    await this.isEmpty(name, password);

    await this.isAuth(id, selecId);

    await this.userRepository.update(
      { id },
      {
        password,
      },
    );
  }

  async deleteUser(id: number, selecId: number) {
    await this.isAuth(id, selecId);

    await this.userRepository.delete({ id });
  }

  // 미입력 여부 확인
  async isEmpty(name: string, password: number) {
    if (!name) {
      throw new NotFoundException(`Cannot found name.`);
    }

    if (!password) {
      throw new NotFoundException(`Cannot found password.`);
    }
  }

  // 권한 확인
  async isAuth(id: number, selecId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: selecId,
      },
    });
    if (!user) {
      throw new NotFoundException(`Cannot found user.`);
    }

    if (user.id !== id) {
      throw new ForbiddenException('Cannot access');
    }
  }
}
