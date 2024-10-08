import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../../users/providers/user.service";
import { LoginDto } from "../models/login.dto";

@Injectable()
export class AuthService {
  public constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto.username);
    if (user?.password !== loginDto.password) throw new UnauthorizedException();
    const payload = { sub: user.userId, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
