import {  Inject,  Injectable,  NotFoundException,} from "@nestjs/common";
import type { IAgentLogRepository } from "../../../domain/repositories/agentLogRepository.interface";

@Injectable()
export class FindAgentLogByIdUseCase {
  constructor(
    @Inject("AgentLogRepository")
    private readonly agentLogRepository: IAgentLogRepository
  ) {}

  async execute(
    id: string,

    organizationId: string
  ) {
    const log =
      await this.agentLogRepository.findById(
        id,
        organizationId
      );

    if (!log) {
      throw new NotFoundException(
        "Agent log not found"
      );
    }

    return log;
  }
}