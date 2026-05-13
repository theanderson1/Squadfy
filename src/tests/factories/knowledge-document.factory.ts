import { KnowledgeDocument } from "../../domain/entities/knowledgeDocument.entity";


export function makeKnowledgeDocument(
  overrides?: Partial<KnowledgeDocument>
): KnowledgeDocument {
  return {
    id: crypto.randomUUID(),

    organizationId:
      crypto.randomUUID(),

    title: "Default title",

    content:
      "Default content",

    visibility: "PUBLIC",

    createdAt: new Date(),

    ...overrides,
  };
}