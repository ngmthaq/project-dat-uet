import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EncryptionService } from "@/@core/encryption/encryption.service";
import { UserService } from "@/user/providers/user.service";
import { User } from "@/user/entities/user.entity";
import { AuthUser } from "../entities/auth-user.entity";
import { LoginDto } from "../dto/login.dto";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { UpdateReportDto } from "@/user/dto/update-report.dto";
import { CreateReportDto } from "@/user/dto/create-report.dto";

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

  public async changePassword(authUser: User, changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(
      authUser.id,
      changePasswordDto.password,
      changePasswordDto.newPassword,
    );
  }

  public async getStudentCVs(id: number) {
    return this.userService.getStudentCVs(id);
  }

  public async getStudentCV(id: number, cvId: number) {
    return this.userService.getStudentCV(id, cvId);
  }

  public async uploadStudentCV(id: number, cvFile: Express.Multer.File) {
    return this.userService.uploadStudentCV(id, cvFile);
  }

  public async deleteStudentCV(id: number, cvId: number) {
    return this.userService.deleteStudentCV(id, cvId);
  }

  public async getStudentReport(id: number) {
    return this.userService.getStudentReport(id);
  }

  public async createStudentReport(id: number, createReportDto: CreateReportDto) {
    return this.userService.createStudentReport(id, createReportDto);
  }

  public async uploadStudentReport(id: number, reportFile: Express.Multer.File) {
    return this.userService.uploadStudentReport(id, reportFile);
  }

  public async updateStudentReport(id: number, updateReportDto: UpdateReportDto) {
    return this.userService.updateStudentReport(id, updateReportDto);
  }

  public async deleteStudentReport(id: number) {
    return this.userService.deleteStudentReport(id);
  }
}
