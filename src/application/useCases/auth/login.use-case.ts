import bcrypt from "bcrypt";
import {  Inject,  Injectable,  UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { IUserRepository } from "../../../domain/repositories/userRepository.interface";


@Injectable()
export class LoginUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository,

    private readonly jwtService: JwtService
  ) {}

  async execute({
    email,
    password,
  }: {
    email: string;

    password: string;
  }) {
    const user =
      await this.userRepository.findByEmail(
        email
      );

    if (!user) {
      throw new UnauthorizedException(
        "Invalid credentials"
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        "Invalid credentials"
      );
    }

    const token =
      await this.jwtService.signAsync({
        sub: user.id,

        organizationId:
          user.organizationId,

        role: user.role,
      });

    return {
      token,
    };
  }
}