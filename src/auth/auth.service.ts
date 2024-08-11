import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(loginDto.username);
    if (user?.password !== loginDto.password) throw new UnauthorizedException();
    const payload = { sub: user.userId, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
