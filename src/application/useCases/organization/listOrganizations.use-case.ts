import { Inject, Injectable } from "@nestjs/common";
import type { IOrganizationRepository } from "../../../domain/repositories/organizationRepository.interface";


@Injectable()
export class ListOrganizationsUseCase {
    constructor(
        @Inject(
            "OrganizationRepository"
        )
        private readonly organizationRepository: IOrganizationRepository
    ) { }

    async execute() {
        return this.organizationRepository.findAll();
    }
}