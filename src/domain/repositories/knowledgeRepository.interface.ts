 import { KnowledgeDocument } from "../entities/knowledgeDocument.entity";

export interface IKnowledgeRepository {
  create(
    data: Omit<
      KnowledgeDocument,
      "id" | "createdAt"
    >
  ): Promise<KnowledgeDocument>;

  findById(
    id: string,
    organizationId: string
  ): Promise<KnowledgeDocument | null>;

  listByOrganization(
    organizationId: string
  ): Promise<KnowledgeDocument[]>;

  findRelevantDocuments(
    question: string,
    organizationId: string
  ): Promise<KnowledgeDocument[]>;
}