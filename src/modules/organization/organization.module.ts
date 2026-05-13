import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { CreateOrganizationUseCase } from "../../application/useCases/organization/createOrganization.use-case";
import { OrganizationRepository } from "../../infra/repositories/organization.repository";
import { ListOrganizationsUseCase } from "../../application/useCases/organization/listOrganizations.use-case";

@Module({
  controllers: [
    OrganizationController,
  ],

  providers: [
    CreateOrganizationUseCase,
    ListOrganizationsUseCase,

    {
      provide:
        "OrganizationRepository",

      useClass:
        OrganizationRepository,
    },
  ],
})
export class OrganizationModule {}