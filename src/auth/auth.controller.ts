import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  handleRegister(@Body() registerBody: RegisterAuthDto) {
    return this.authService.register(registerBody);
  }

  @Post('login')
  handleLogin(@Body() userLoginBody: LoginAuthDto) {
    return this.authService.login(userLoginBody);
  }
}
