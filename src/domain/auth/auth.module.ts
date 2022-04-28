import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from 'src/entities/user/user.module';

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
  providers: [AuthService, JwtStrategy],
  exports:[
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
