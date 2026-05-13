import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../infra/auth/jwt-auth.guard";
import { CurrentUser } from "../../infra/auth/currentUser.decorator";
import { CreateKnowledgeUseCase } from "../../application/useCases/knowledgeDocument/createKnowledge.use-case";
import { FindKnowledgeByIdUseCase } from "../../application/useCases/knowledgeDocument/findKnowledgeById.use-case";
import { CreateKnowledgeDTO } from "../../application/dto/knowledgeDocument/createKnowledge.dto";
import { ListKnowledgeUseCase } from "../../application/useCases/knowledgeDocument/listKnowledge.use-case";

@Controller("knowledge")
export class KnowledgeDocumentController {
    constructor(
        private readonly createKnowledgeUseCase: CreateKnowledgeUseCase,
        private readonly findKnowledgeByIdUseCase: FindKnowledgeByIdUseCase,
        private readonly listKnowledgeUseCase: ListKnowledgeUseCase
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body()
        body: CreateKnowledgeDTO,

        @CurrentUser()
        user: {
            organizationId: string;
        }
    ) {
        return this.createKnowledgeUseCase.execute({
            organizationId: user.organizationId,

            title: body.title,

            content: body.content,

            visibility: body.visibility,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findById(
        @Param("id")
        id: string,

        @CurrentUser()
        user: {
            organizationId: string;
        }
    ) {
        return this.findKnowledgeByIdUseCase.execute({
            id,

            organizationId: user.organizationId,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async list(
        @CurrentUser()
        user: {
            organizationId: string;
        }
    ) {
        return this.listKnowledgeUseCase.execute({
            organizationId:
                user.organizationId,
        });
    }
}