import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'), // 중요: board 데이터베이스는 미리 생성해놓아야 합니다!
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: this.configService.get<boolean>('DATABASE_SYNCHRONIZE'), // Production 환경에서는 false로 설정해야 합니다.
    };
  }
}
