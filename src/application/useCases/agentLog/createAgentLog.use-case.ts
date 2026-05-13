import { Inject, Injectable, } from "@nestjs/common";
import type { IAgentLogRepository } from "../../../domain/repositories/agentLogRepository.interface";


@Injectable()
export class CreateAgentLogUseCase {
  constructor(
    @Inject("AgentLogRepository")
    private readonly agentLogRepository: IAgentLogRepository
  ) { }

  async execute({
    organizationId,
    question,
    answer,
    decision,
    contextUsed,
  }: {
    organizationId: string;

    question: string;

    answer: string;

    decision: string;

    contextUsed?: unknown;
  }) {
    return this.agentLogRepository.create({
      organizationId,

      question,

      answer,

      decision,

      contextUsed,
    });
  }
}