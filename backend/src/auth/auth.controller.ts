import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async registerUser(
    @Body() body: { username: string; email: string; password: string },
  ) {
    const { username, email, password } = body;
    await this.authService.register(username, email, password);
    return { message: 'User registered successfully' };
  }

  @Get('user')
  async getProfile(@Request() req) {
    if (req.user) {
      const user = await this.authService.getUser(req.user.email);
      return { user };
    }
  }
}
