import { Inject, Injectable } from "@nestjs/common";
import type { IKnowledgeRepository } from "../../../domain/repositories/knowledgeRepository.interface";

@Injectable()
export class ListKnowledgeUseCase {
  constructor(
    @Inject("KnowledgeRepository")
    private readonly knowledgeRepository: IKnowledgeRepository
  ) { }

  async execute({
    organizationId,
  }: {
    organizationId: string;
  }) {
    return this.knowledgeRepository.listByOrganization(
      organizationId
    );
  }
}