import { Inject, Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import type { IKnowledgeRepository } from "../../../domain/repositories/knowledgeRepository.interface";

@Injectable()
export class FindKnowledgeByIdUseCase {
  constructor(
    @Inject("KnowledgeRepository")
    private readonly knowledgeRepository: IKnowledgeRepository
  ) { }

  async execute({
    id,
    organizationId,
  }: {
    id: string;

    organizationId: string;
  }) {
    if (!id?.trim()) {
      throw new BadRequestException(
        "Document id is required"
      );
    }

    const document =
      await this.knowledgeRepository.findById(
        id,
        organizationId
      );

    if (!document) {
      throw new NotFoundException(
        "Knowledge document not found"
      );
    }

    return document;
  }
}