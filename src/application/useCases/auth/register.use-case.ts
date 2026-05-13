import bcrypt from "bcrypt";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IUserRepository } from "../../../domain/repositories/userRepository.interface";


@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) { }

  async execute({
    organizationId,
    name,
    email,
    password,
  }: {
    organizationId: string;

    name: string;

    email: string;

    password: string;
  }) {
    const userAlreadyExists =
      await this.userRepository.findByEmail(
        email
      );

    if (userAlreadyExists) {
      throw new BadRequestException(
        "User already exists"
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await this.userRepository.create({
        organizationId,

        name,

        email,

        password:
          hashedPassword,

        role: "USER",
      });

    return {
      id: user.id,

      name: user.name,

      email: user.email,

      role: user.role,
    };
  }
}