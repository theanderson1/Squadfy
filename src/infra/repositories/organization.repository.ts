import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { db } from "../database/connection";
import { organizations } from "../database/schema";
import { Organization } from "../../domain/entities/organization.entity";
import { IOrganizationRepository } from "../../domain/repositories/organizationRepository.interface";

@Injectable()
export class OrganizationRepository
  implements IOrganizationRepository
{
  async create(
    data: Omit<
      Organization,
      "id" | "createdAt"
    >
  ): Promise<Organization> {
    const [organization] =
      await db
        .insert(organizations)
        .values(data)
        .returning();

    return organization!;
  }

  async findByName(
    name: string
  ): Promise<Organization | null> {
    const [organization] =
      await db
        .select()
        .from(organizations)
        .where(
          eq(
            organizations.name,
            name
          )
        );

    return organization || null;
  }
  
    async findAll(): Promise<
    Organization[]
  > {
    return db
      .select()
      .from(organizations);
  }
}