import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "@/user/user.module";
import { MulterModule } from "@/@core/multer/multer.module";
import { ConfigModule } from "@/@core/config/config.module";
import { EncryptionModule } from "@/@core/encryption/encryption.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./providers/auth.service";
import { AuthGuard } from "./providers/auth.guard";

const GlobalAuthGuard = { provide: APP_GUARD, useClass: AuthGuard };

@Module({
  imports: [
    ConfigModule,
    EncryptionModule,
    MulterModule,
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
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    process.env.APP_ENABLE_AUTH === "true" ? GlobalAuthGuard : undefined,
  ].filter(Boolean),
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
