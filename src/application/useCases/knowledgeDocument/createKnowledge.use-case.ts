import { Inject, Injectable } from "@nestjs/common";
import type { IKnowledgeRepository } from "../../../domain/repositories/knowledgeRepository.interface";

@Injectable()
export class CreateKnowledgeUseCase {
  constructor(
    @Inject("KnowledgeRepository")
    private readonly knowledgeRepository: IKnowledgeRepository
  ) {}

  async execute({
    organizationId,
    title,
    content,
    visibility,
  }: { 
    organizationId: string;

    title: string;

    content: string;

    visibility:
      | "PUBLIC"
      | "INTERNAL"
      | "RESTRICTED";
  }) {
    return this.knowledgeRepository.create({
      organizationId,
      title,
      content,
      visibility,
    });
  }
}