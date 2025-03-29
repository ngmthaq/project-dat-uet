import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "@/users/providers/user.repository";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { LoginDto } from "../models/login.dto";
import { AuthUser } from "../models/auth-user.entity";

@Injectable()
export class AuthService {
  public constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.userRepository.findByUsername(loginDto.username);
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
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException([]);
    return { ...user, password: undefined };
  }
}
