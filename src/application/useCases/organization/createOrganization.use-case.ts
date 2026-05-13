import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { IOrganizationRepository } from "../../../domain/repositories/organizationRepository.interface";

@Injectable()
export class CreateOrganizationUseCase {
  constructor(
    @Inject("OrganizationRepository")
    private readonly organizationRepository: IOrganizationRepository
  ) { }

  async execute({
    name,
  }: {
    name: string;
  }) {
    const organizationAlreadyExists =
      await this.organizationRepository.findByName(
        name
      );

    if (organizationAlreadyExists) {
      throw new BadRequestException(
        "Organization already exists"
      );
    }

    return this.organizationRepository.create({
      name,
    });
  }
}