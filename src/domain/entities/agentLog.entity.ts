export interface AgentLog {
  id: string;
  organizationId: string;
  question: string;
  answer: string;
  decision: string;
  contextUsed: unknown;
  createdAt: Date;
}