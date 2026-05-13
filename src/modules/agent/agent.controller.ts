import {  Body,  Controller,  HttpCode,  HttpStatus,  Post,  UseGuards} from "@nestjs/common";
import { QueryAgentUseCase } from "../../application/useCases/agent/queryAgent.use-case";
import { JwtAuthGuard } from "../../infra/auth/jwt-auth.guard";
import { QueryAgentDTO } from "../../application/dto/agent/queryAgent.dto";
import { CurrentUser } from "../../infra/auth/currentUser.decorator";


@Controller("agent")
export class AgentController {
  constructor(
    private readonly queryAgentUseCase: QueryAgentUseCase
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("query")
  @HttpCode(HttpStatus.OK)
  async query(
    @Body()
    body: QueryAgentDTO,

    @CurrentUser()
    user: {
      organizationId: string;
    }
  ) {
    return this.queryAgentUseCase.execute(
      body.question,

      user.organizationId
    );
  }
}