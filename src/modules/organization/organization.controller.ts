import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, } from "@nestjs/common";
import { CreateOrganizationUseCase } from "../../application/useCases/organization/createOrganization.use-case";
import { ListOrganizationsUseCase } from "../../application/useCases/organization/listOrganizations.use-case";
import { CreateOrganizationDTO } from "../../application/dto/organization/createOrganization.dto";
import { JwtAuthGuard } from "../../infra/auth/jwt-auth.guard";

@Controller("organizations")
export class OrganizationController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,

    private readonly listOrganizationsUseCase: ListOrganizationsUseCase
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    body: CreateOrganizationDTO
  ) {
    return this.createOrganizationUseCase.execute({
      name: body.name,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async list() {
    return this.listOrganizationsUseCase.execute();
  }
}