import {
  Body,
  Controller,
  Delete,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '~auth/services/auth.service';
import { SignInDto } from '../dto/signin.dto';
import { SignUpDto } from '../dto/signup.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Request() request) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    return this.authService.logout(token);
  }
}
