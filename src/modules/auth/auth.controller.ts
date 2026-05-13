import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDTO } from "../../application/dto/auth/login.dto";
import { LoginUseCase } from "../../application/useCases/auth/login.use-case";
import { RegisterUseCase } from "../../application/useCases/auth/register.use-case";
import { RegisterDTO } from "../../application/dto/auth/register.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {console.log("registerUseCase:", registerUseCase); }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async register(
        @Body()
        body: RegisterDTO
    ) {
        return this.registerUseCase.execute({
            organizationId:
                body.organizationId,

            name: body.name,

            email: body.email,

            password: body.password,
        });
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(
        @Body()
        body: LoginDTO
    ) {
        return this.loginUseCase.execute({
            email: body.email,

            password: body.password,
        });
    }
}