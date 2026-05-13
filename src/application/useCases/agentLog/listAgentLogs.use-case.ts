import {  Inject,  Injectable,} from "@nestjs/common";
import type { IAgentLogRepository } from "../../../domain/repositories/agentLogRepository.interface";

@Injectable()
export class ListAgentLogsUseCase {
  constructor(
    @Inject("AgentLogRepository")
    private readonly agentLogRepository: IAgentLogRepository
  ) {}

  async execute(
    organizationId: string
  ) {
    return this.agentLogRepository.listByOrganization(
      organizationId
    );
  }
}