import { classifyQuestionNode } from "../../../agents/nodes/classifyQuestion.node";
import { makeKnowledgeDocument } from "../../factories/knowledge-document.factory";

describe(
  "classifyQuestionNode",
  () => {

    it(
      "should return INSUFFICIENT_CONTEXT when no documents are found",
      async () => {

        const result =
          await classifyQuestionNode({
            question:
              "Qual a política?",

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

    it(
      "should return RESTRICTED when restricted documents are found",
      async () => {

        const document =
          makeKnowledgeDocument({
            visibility:
              "RESTRICTED",
          });

        const result =
          await classifyQuestionNode({
            question:
              "Qual o planejamento estratégico?",

            organizationId:
              "org-1",

            documents: [document],

            decision:
              "INSUFFICIENT_CONTEXT",

            answer: "",
          });

        expect(
          result.decision
        ).toBe(
          "RESTRICTED"
        );

        expect(
          result.answer
        ).toContain(
          "acesso restrito"
        );
      }
    );

    it(
      "should return ANSWERED when public documents exist",
      async () => {

        const document =
          makeKnowledgeDocument({
            visibility:
              "PUBLIC",
          });

        const result =
          await classifyQuestionNode({
            question:
              "Qual a política de férias?",

            organizationId:
              "org-1",

            documents: [document],

            decision:
              "INSUFFICIENT_CONTEXT",

            answer: "",
          });

        expect(
          result.decision
        ).toBe(
          "ANSWERED"
        );
      }
    );
  }
);