import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from '~config/env.config';
import { UserModule } from '~users/user.module';
import { AuthController } from './http/controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: env.JWT.SECRET,
      signOptions: { expiresIn: env.JWT.EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
