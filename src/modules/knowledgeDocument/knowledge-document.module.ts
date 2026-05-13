import { Module } from "@nestjs/common";
import { KnowledgeDocumentController } from "./knowledge-document.controller";
import { CreateKnowledgeUseCase } from "../../application/useCases/knowledgeDocument/createKnowledge.use-case";
import { FindKnowledgeByIdUseCase } from "../../application/useCases/knowledgeDocument/findKnowledgeById.use-case";
import { KnowledgeRepository } from "../../infra/repositories/knowledge.repository";
import { ListKnowledgeUseCase } from "../../application/useCases/knowledgeDocument/listKnowledge.use-case";

@Module({
  controllers: [
    KnowledgeDocumentController,
  ],

  providers: [
    CreateKnowledgeUseCase,
    FindKnowledgeByIdUseCase,
    ListKnowledgeUseCase,

    {
      provide:
        "KnowledgeRepository",

      useClass:
        KnowledgeRepository,
    },
  ],
})
export class KnowledgeDocumentModule { }