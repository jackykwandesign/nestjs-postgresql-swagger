import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from 'src/entities/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{
        expiresIn: process.env.JWT_EXPIRE_IN
      }
    }),
    UserModule,
  ],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
