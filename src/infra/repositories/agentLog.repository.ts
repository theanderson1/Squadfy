import { and, desc, eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { db } from "../database/connection";
import { IAgentLogRepository } from "../../domain/repositories/agentLogRepository.interface";
import { AgentLog } from "../../domain/entities/agentLog.entity";
import { agentLogs } from "../database/schema/agenteLogs";


@Injectable()
export class AgentLogRepository
    implements IAgentLogRepository {
    async create(
        data: Omit<
            AgentLog,
            "id" | "createdAt"
        >
    ): Promise<AgentLog> {
        const [log] = await db
            .insert(agentLogs)
            .values(data)
            .returning();

        return log!;
    }

    async listByOrganization(
        organizationId: string
    ): Promise<AgentLog[]> {
        return db
            .select()
            .from(agentLogs)
            .where(
                eq(
                    agentLogs.organizationId,
                    organizationId
                )
            )
            .orderBy(
                desc(agentLogs.createdAt)
            );
    }

    async findById(
        id: string,

        organizationId: string
    ): Promise<AgentLog | null> {
        const [log] = await db
            .select()
            .from(agentLogs)
            .where(
                and(
                    eq(agentLogs.id, id),

                    eq(
                        agentLogs.organizationId,
                        organizationId
                    )
                )
            );

        return log || null;
    }
}