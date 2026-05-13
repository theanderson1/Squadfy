import { AgentState } from "../state/agent.state";
import { KnowledgeRepository } from "../../infra/repositories/knowledge.repository";

export async function retrieveContextNode(
    state: AgentState
): Promise<Partial<AgentState>> {
    const repository = new KnowledgeRepository();

    const documents =
        await repository.findRelevantDocuments(
            state.question,
            state.organizationId
        );

    return { documents };
}