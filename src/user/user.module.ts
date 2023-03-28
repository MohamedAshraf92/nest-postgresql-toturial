import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'TheSecretIsBlaBlaBla',
      signOptions: {
        expiresIn: '2d',
      },
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [JwtModule, PassportModule],
})
export class UserModule {}
