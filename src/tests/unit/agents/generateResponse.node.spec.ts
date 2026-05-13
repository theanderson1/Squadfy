import { generateResponseNode } from "../../../agents/nodes/generateResponse.node";
import { makeKnowledgeDocument } from "../../factories/knowledge-document.factory";


describe(
  "generateResponseNode",
  () => {
    it(
      "should never generate response using restricted documents", 
      async () => {
        const restrictedDoc =
          makeKnowledgeDocument({
            visibility:
              "RESTRICTED",
          });

        const result =
          await generateResponseNode({
            question:
              "Qual a estratégia?",

            organizationId:
              "org-1",

            documents: [
              restrictedDoc,
            ],

            decision:
              "RESTRICTED",

            answer: "",
          });

        expect(
          result.answer
        ).toBeUndefined();
      }
    );
  }
);