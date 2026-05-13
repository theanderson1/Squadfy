import { AgentState } from "../state/agent.state";
import { responsePrompt } from "../prompts/response.prompt";
import { GroqProvider } from "../providers/GroqProvider";

export async function generateResponseNode(
  state: AgentState
): Promise<Partial<AgentState>> {
  if (state.decision !== "ANSWERED") {
    return {};
  }

  const allowedDocuments =
    state.documents.filter(
      (doc) =>
        doc.visibility !== "RESTRICTED"
    );

  if (allowedDocuments.length === 0) {
    return {
      decision:
        "INSUFFICIENT_CONTEXT",

      answer:
        "Não encontrei informações suficientes para responder com segurança.",
    };
  }

  const provider =
    new GroqProvider();

  const context =
    allowedDocuments
      .map(
        (doc) => `
Título: ${doc.title}

Conteúdo:
${doc.content}
`
      )
      .join("\n\n");

  const prompt =
    responsePrompt(
      state.question,
      context
    );

  const rawResponse =
    await provider.invoke(prompt);

  return {
    decision: "ANSWERED",

    answer: rawResponse.trim(),
  };
}