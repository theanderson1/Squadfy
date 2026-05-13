import { Module } from "@nestjs/common";
import { AgentLogController } from "./agentLog.controller";
import { CreateAgentLogUseCase } from "../../application/useCases/agentLog/createAgentLog.use-case";
import { ListAgentLogsUseCase } from "../../application/useCases/agentLog/listAgentLogs.use-case";
import { FindAgentLogByIdUseCase } from "../../application/useCases/agentLog/findAgentLogById.use-case";
import { AgentLogRepository } from "../../infra/repositories/agentLog.repository";

@Module({
  controllers: [AgentLogController],

  providers: [
    CreateAgentLogUseCase,

    ListAgentLogsUseCase,

    FindAgentLogByIdUseCase,

    {
      provide:
        "AgentLogRepository",

      useClass:
        AgentLogRepository,
    },
  ],

  exports: [
    CreateAgentLogUseCase,
  ],
})
export class AgentLogModule {}