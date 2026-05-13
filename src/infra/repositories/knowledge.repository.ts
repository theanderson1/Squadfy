import { eq, ilike, and, or } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { db } from "../database/connection";
import { knowledgeDocuments } from "../database/schema";
import { IKnowledgeRepository } from "../../domain/repositories/knowledgeRepository.interface";
import { KnowledgeDocument } from "../../domain/entities/knowledgeDocument.entity";

@Injectable()
export class KnowledgeRepository
  implements IKnowledgeRepository
{
  async create(
    data: Omit<
      KnowledgeDocument,
      "id" | "createdAt"
    >
  ): Promise<KnowledgeDocument> {
    const [document] = await db
      .insert(knowledgeDocuments)
      .values(data)
      .returning();

    return document!;
  }

  async findById(
    id: string,
    organizationId: string
  ): Promise<KnowledgeDocument | null> {
    const [document] = await db
      .select()
      .from(knowledgeDocuments)
      .where(
        and(
          eq(
            knowledgeDocuments.id,
            id
          ),

          eq(
            knowledgeDocuments.organizationId,
            organizationId
          )
        )
      );

    return document || null;
  }

  async listByOrganization(
    organizationId: string
  ): Promise<KnowledgeDocument[]> {
    return db
      .select()
      .from(knowledgeDocuments)
      .where(
        eq(
          knowledgeDocuments.organizationId,
          organizationId
        )
      );
  }

  async findRelevantDocuments(
    question: string,
    organizationId: string
  ): Promise<KnowledgeDocument[]> {
    const stopWords = [
      "quantos",
      "quais",
      "como",
      "onde",
      "quando",
      "posso",
      "de",
      "da",
      "do",
      "e",
      "a",
      "o",
    ];

    const keywords =
      question
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .split(" ")
        .filter(
          (word) =>
            word.length > 2 &&
            !stopWords.includes(word)
        );

    if (!keywords.length) {
      return [];
    }

    const conditions = keywords.flatMap(
      (keyword) => [
        ilike(
          knowledgeDocuments.title,
          `%${keyword}%`
        ),

        ilike(
          knowledgeDocuments.content,
          `%${keyword}%`
        ),
      ]
    );

    return db
      .select()
      .from(knowledgeDocuments)
      .where(
        and(
          eq(
            knowledgeDocuments.organizationId,
            organizationId
          ),

          or(...conditions)
        )
      );
  }
}