import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { UserModule } from "@/users/user.module";
import { ConfigModule } from "@/@core/config/config.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./providers/auth.service";
import { AuthGuard } from "./providers/auth.guard";

@Module({
  imports: [
    ConfigModule,
    UserModule,
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
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
