export interface KnowledgeDocument {
  id: string;
  organizationId: string;
  title: string;
  content: string;
  visibility:
    | "PUBLIC"
    | "INTERNAL"
    | "RESTRICTED";
  createdAt: Date;
}