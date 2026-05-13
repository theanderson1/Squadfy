import { Injectable } from "@nestjs/common";
import { knowledgeAgentGraph } from "../../../agents/graphs/knowledgeAgent.graph";
import { CreateAgentLogUseCase } from "../agentLog/createAgentLog.use-case";

@Injectable()
export class QueryAgentUseCase {
  constructor(
    private readonly createAgentLogUseCase: CreateAgentLogUseCase
  ) {}

  async execute(
    question: string,
    organizationId: string
  ) {
    const result = await knowledgeAgentGraph.invoke({
      question,
      organizationId,
      documents: [],
      decision: "INSUFFICIENT_CONTEXT",
      answer: "",
    });

    await this.createAgentLogUseCase.execute({
      organizationId,
      question,
      answer: result.answer,
      decision: result.decision,
      contextUsed: result.documents,
    });

    return {
      question: result.question,
      decision: result.decision,
      answer: result.answer
    };
  }
}