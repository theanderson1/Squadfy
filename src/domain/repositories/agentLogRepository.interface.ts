import { AgentLog } from "../entities/agentLog.entity";

export interface IAgentLogRepository {
  create(
    data: Omit<
      AgentLog,
      "id" | "createdAt"
    >
  ): Promise<AgentLog>;

  listByOrganization(
    organizationId: string
  ): Promise<AgentLog[]>;

  findById(
    id: string,
    organizationId: string
  ): Promise<AgentLog | null>;
}