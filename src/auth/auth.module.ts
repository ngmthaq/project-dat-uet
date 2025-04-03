import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { UserModule } from "@/user/user.module";
import { ConfigModule } from "@/@core/config/config.module";
import { EncryptionModule } from "@/@core/encryption/encryption.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./providers/auth.service";
import { AuthGuard } from "./providers/auth.guard";

@Module({
  imports: [
    UserModule,
    ConfigModule,
    EncryptionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("secret"),
        signOptions: {
          expiresIn: `${configService.get<number>("auth.expiresIn")}s`,
        },
      }),
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: (req, file, callback) => {
            callback(null, "public/uploads");
          },
          filename: (req, file, callback) => {
            const ext = file.mimetype.split("/")[1];
            const filename = `${Date.now()}-${uuidv4()}.${ext}`;
            callback(null, filename);
          },
        }),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
