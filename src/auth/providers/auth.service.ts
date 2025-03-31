import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { UserService } from "@/users/providers/user.service";
import { LoginDto } from "../dto/login.dto";
import { AuthUser } from "../entities/auth-user.entity";

@Injectable()
export class AuthService {
  public constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
    private encryptionService: EncryptionService,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException([]);
    const isPasswordCorrect = await this.encryptionService.check(loginDto.password, user.password);
    if (!isPasswordCorrect) throw new UnauthorizedException([]);
    const payload: AuthUser = { ...user, password: undefined };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken: accessToken,
      expiredIn: this.configService.get<number>("auth.expiresIn") + "s",
      user: payload,
    };
  }

  public async getAuthUser(userId: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new UnauthorizedException([]);
    return { ...user, password: undefined };
  }
}
