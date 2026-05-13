export function classifyPrompt(
    question: string,
    context: string
) {
    return `
Você é um agente corporativo.

Analise a pergunta e o contexto.

Regras:
- Nunca invente informações
- Nunca use conhecimento externo
- Use apenas o contexto

Se houver informação RESTRICTED:
Retorne:
RESTRICTED

Se não houver contexto suficiente:
Retorne:
INSUFFICIENT_CONTEXT

Se puder responder:
Retorne:
ANSWERED

Contexto:
${context}

Pergunta:
${question}
`;
}