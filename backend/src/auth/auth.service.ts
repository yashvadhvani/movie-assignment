import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const payload = { sub: user.id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
        }),
        user,
      };
    }
    throw new UnauthorizedException();
  }

  async register(username, email, password) {
    const user = await this.usersService.register(username, email, password);
    return user;
  }
  async getUser(email: string) {
    const user = await this.usersService.findOne(email);
    return {
      user,
    };
  }
}
