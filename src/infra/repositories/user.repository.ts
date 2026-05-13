import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { db } from "../database/connection";
import { users } from "../database/schema";
import { IUserRepository } from "../../domain/repositories/userRepository.interface";
import { User } from "../../domain/entities/user.entity";

@Injectable()
export class UserRepository
  implements IUserRepository
{
  async create(
    data: Omit<
      User,
      "id" | "createdAt"
    >
  ): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(data)
      .returning();

    return user!;
  }

  async findByEmail(
    email: string
  ): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user || null;
  }

  async findById(
    id: string
  ): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user || null;
  }
}