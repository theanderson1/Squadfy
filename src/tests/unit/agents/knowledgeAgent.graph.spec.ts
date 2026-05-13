import { knowledgeAgentGraph } from "../../../agents/graphs/knowledgeAgent.graph";
import { KnowledgeRepository } from "../../../infra/repositories/knowledge.repository";

jest.mock(
  "@/infra/repositories/knowledge.repository"
);

describe(
  "knowledgeAgentGraph",
  () => {
    it(
      "should return insufficient context when no documents exist",
      async () => {
        (
          KnowledgeRepository as jest.Mock
        ).mockImplementation(() => ({
          findRelevantDocuments:
            jest
              .fn()
              .mockResolvedValue([]),
        }));

        const result =
          await knowledgeAgentGraph.invoke({
            question:
              "Pergunta inexistente",

            organizationId:
              "org-1",

            documents: [],

            decision:
              "INSUFFICIENT_CONTEXT",

            answer: "",
          });

        expect(
          result.decision
        ).toBe(
          "INSUFFICIENT_CONTEXT"
        );

        expect(
          result.answer
        ).toContain(
          "Não encontrei"
        );
      }
    );
  }
);