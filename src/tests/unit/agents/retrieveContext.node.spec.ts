import { retrieveContextNode } from "../../../agents/nodes/retrieveContext.node";
import { KnowledgeRepository } from "../../../infra/repositories/knowledge.repository";


jest.mock(
  "@/infra/repositories/knowledge.repository"
);

describe(
  "retrieveContextNode",
  () => {
    it(
      "should never retrieve documents from another organization",
      async () => {
        const findRelevantDocuments =
          jest.fn().mockResolvedValue([
            {
              id: "doc-1",

              organizationId:
                "org-1",

              title:
                "Internal policy",

              content:
                "Some content",

              visibility:
                "PUBLIC",
            },
          ]);

        (
          KnowledgeRepository as jest.Mock
        ).mockImplementation(() => ({
          findRelevantDocuments,
        }));

        await retrieveContextNode({
          question:
            "policy",

          organizationId:
            "org-2",

          documents: [],

          decision:
            "INSUFFICIENT_CONTEXT",

          answer: "",
        });

        expect(
          findRelevantDocuments
        ).toHaveBeenCalledWith(
          "policy",

          "org-2"
        );
      }
    );
  }
);