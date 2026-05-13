export function responsePrompt(
  question: string,
  context: string
) {
  return `
Você é um agente corporativo.

IMPORTANTE:
- Responda SOMENTE usando o contexto fornecido
- Nunca invente informações
- Nunca use conhecimento externo
- Seja direto e objetivo

Contexto:
${context}

Pergunta:
${question}
`;
}