import { Module } from "@nestjs/common";
import { AgentController } from "./agent.controller";
import { QueryAgentUseCase } from "../../application/useCases/agent/queryAgent.use-case";
import { AgentLogModule } from "../agentLog/agentLog.module";

@Module({
  imports: [AgentLogModule],
  controllers: [AgentController],
  providers: [QueryAgentUseCase],
})
export class AgentModule {}