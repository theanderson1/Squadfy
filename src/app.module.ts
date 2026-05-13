import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { KnowledgeDocumentModule } from "./modules/knowledgeDocument/knowledge-document.module";
import { AgentModule } from "./modules/agent/agent.module";
import { AgentLogModule } from "./modules/agentLog/agentLog.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    AuthModule,
    OrganizationModule,
    KnowledgeDocumentModule,
    AgentModule,
    AgentLogModule,
  ],
})
export class AppModule {}