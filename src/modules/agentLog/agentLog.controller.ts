import {  Controller,  Get,  Param,  ParseUUIDPipe,  UseGuards} from "@nestjs/common";
import { ListAgentLogsUseCase } from "../../application/useCases/agentLog/listAgentLogs.use-case";
import { FindAgentLogByIdUseCase } from "../../application/useCases/agentLog/findAgentLogById.use-case";
import { JwtAuthGuard } from "../../infra/auth/jwt-auth.guard";
import { CurrentUser } from "../../infra/auth/currentUser.decorator";


@Controller("agent-logs")
export class AgentLogController {
  constructor(
    private readonly listAgentLogsUseCase: ListAgentLogsUseCase,
    private readonly findAgentLogByIdUseCase: FindAgentLogByIdUseCase
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(
    @CurrentUser()
    user: {
      organizationId: string;
    }
  ) {
    return this.listAgentLogsUseCase.execute(
      user.organizationId
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findById(
    @Param(
      "id",
      ParseUUIDPipe
    )
    id: string,

    @CurrentUser()
    user: {
      organizationId: string;
    }
  ) {
    return this.findAgentLogByIdUseCase.execute(
      id,

      user.organizationId
    );
  }
}