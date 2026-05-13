import { QueryAgentUseCase } from "../../../application/useCases/agent/queryAgent.use-case";

jest.mock(
  "../../../agents/graphs/knowledgeAgent.graph",
  () => ({
    knowledgeAgentGraph: {
      invoke: jest.fn().mockResolvedValue({
        decision: "ANSWERED",
        answer: "Política de férias...",
      }),
    },
  })
);

describe(
  "QueryAgentUseCase",
  () => {
    it(
      "should return agent response",
      async () => {

        const createAgentLogUseCaseMock = {
          execute: jest.fn()
        } as any;

        const useCase =
          new QueryAgentUseCase(
            createAgentLogUseCaseMock
          );

        const result =
          await useCase.execute(
            "Qual a política de férias?",
            "org-1"
          );

        expect(
          result
        ).toHaveProperty(
          "decision"
        );

        expect(
          result
        ).toHaveProperty(
          "answer"
        );
      }
    );
  }
);