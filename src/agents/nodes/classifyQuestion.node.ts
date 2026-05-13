import { AgentState } from "../state/agent.state";

export async function classifyQuestionNode(
  state: AgentState
): Promise<Partial<AgentState>> {
  if (state.documents.length === 0) {
    return {
      decision:
        "INSUFFICIENT_CONTEXT",

      answer:
        "Não encontrei informações suficientes para responder com segurança.",
    };
  }

  const restrictedDocuments =
    state.documents.filter(
      (doc) =>
        doc.visibility === "RESTRICTED"
    );

  if (restrictedDocuments.length > 0) {
    return {
      decision: "RESTRICTED",

      answer:
        "Essa informação possui acesso restrito.",
    };
  }

  return {
    decision: "ANSWERED",
  };
}