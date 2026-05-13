import { Organization } from "../entities/organization.entity";

export interface IOrganizationRepository {
  create(
    data: Omit< 
      Organization,
      "id" | "createdAt"
    >
  ): Promise<Organization>;

  findByName(
    name: string
  ): Promise<Organization | null>;

  findAll(): Promise<Organization[]>;
}