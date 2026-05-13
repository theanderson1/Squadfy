import { START, END, StateGraph } from "@langchain/langgraph";
import { AgentStateAnnotation } from "../state/agent.state";
import { retrieveContextNode } from "../nodes/retrieveContext.node";
import { classifyQuestionNode } from "../nodes/classifyQuestion.node";
import { generateResponseNode } from "../nodes/generateResponse.node";

export const knowledgeAgentGraph =
  new StateGraph(
    AgentStateAnnotation
  )

    .addNode(
      "retrieveContext",
      retrieveContextNode
    )

    .addNode(
      "classifyQuestion",
      classifyQuestionNode
    )

    .addNode(
      "generateResponse",
      generateResponseNode
    )

    .addEdge(
      START,
      "retrieveContext"
    )

    .addEdge(
      "retrieveContext",
      "classifyQuestion"
    )

    .addEdge(
      "classifyQuestion",
      "generateResponse"
    )

    .addEdge(
      "generateResponse",
      END
    )

    .compile();