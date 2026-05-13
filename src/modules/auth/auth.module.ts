import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { LoginUseCase } from "../../application/useCases/auth/login.use-case";
import { UserRepository } from "../../infra/repositories/user.repository";
import { RegisterUseCase } from "../../application/useCases/auth/register.use-case";
import { JwtStrategy } from "../../infra/auth/jwt.strategy";

@Module({
  imports: [
    ConfigModule,

    JwtModule.register({
      secret:
        process.env.JWT_SECRET,

      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    RegisterUseCase,
    LoginUseCase,
    JwtStrategy,

    {
      provide: "UserRepository",

      useClass: UserRepository,
    },
  ],

  exports: [JwtModule],
})
export class AuthModule {}