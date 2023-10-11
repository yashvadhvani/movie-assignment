import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Log in with credentials' })
  @ApiBody({ type: LoginDto }) // LoginDto defines the request body schema
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto }) // RegisterDto defines the request body schema
  async registerUser(@Body() body: RegisterDto) {
    const { username, email, password } = body;
    await this.authService.register(username, email, password);
    return { message: 'User registered successfully' };
  }

  @UseGuards(AuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get User Object (Login Required)' })
  async getProfile(@Request() req) {
    if (req.user) {
      const user = await this.authService.getUser(req.user.email);
      return { user };
    }
  }
}
