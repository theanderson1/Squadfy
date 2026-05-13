import { Annotation } from "@langchain/langgraph";
import { KnowledgeDocument } from "../../domain/entities/knowledgeDocument.entity";

export const AgentStateAnnotation =
  Annotation.Root({
    question: Annotation<string>(),

    organizationId: Annotation<string>(),

    documents:
      Annotation<KnowledgeDocument[]>(),

    decision: Annotation<
      | "ANSWERED"
      | "RESTRICTED"
      | "INSUFFICIENT_CONTEXT"
    >(),

    answer: Annotation<string>(),
  });

export type AgentState =
  typeof AgentStateAnnotation.State;