import { db } from "./connection";
import { organizations, knowledgeDocuments } from "./schema";

async function seed() {
  const createdOrganizations = await db
    .insert(organizations)
    .values([
      {
        name: "Acme Corp",
      },
      {
        name: "TechNova",
      },
      {
        name: "GreenFoods",
      },
      {
        name: "FinWise",
      },
    ])
    .returning();

  const acme = createdOrganizations.find((o) => o.name === "Acme Corp");
  const techNova = createdOrganizations.find((o) => o.name === "TechNova");
  const greenFoods = createdOrganizations.find((o) => o.name === "GreenFoods");
  const finWise = createdOrganizations.find((o) => o.name === "FinWise");

  await db.insert(knowledgeDocuments).values([
    // Acme Corp
    {
      organizationId: acme!.id,
      title: "Política de férias",
      content:
        "O colaborador pode vender até 10 dias de férias.",
      visibility: "PUBLIC",
    },
    {
      organizationId: acme!.id,
      title: "Planejamento estratégico",
      content:
        "Meta de crescimento de 40% em 2027.",
      visibility: "RESTRICTED",
    },
    {
      organizationId: acme!.id,
      title: "Benefícios corporativos",
      content:
        "A empresa oferece plano de saúde, vale alimentação e auxílio home office.",
      visibility: "PUBLIC",
    },

    // TechNova
    {
      organizationId: techNova!.id,
      title: "Guia de onboarding",
      content:
        "Todos os novos colaboradores devem concluir o onboarding em até 7 dias.",
      visibility: "PUBLIC",
    },
    {
      organizationId: techNova!.id,
      title: "Política de segurança",
      content:
        "O uso de autenticação multifator é obrigatório para todos os sistemas internos.",
      visibility: "RESTRICTED",
    },
    {
      organizationId: techNova!.id,
      title: "Roadmap de produto",
      content:
        "Lançamento do novo dashboard analytics previsto para Q3 de 2026.",
      visibility: "RESTRICTED",
    },

    // GreenFoods
    {
      organizationId: greenFoods!.id,
      title: "Manual de sustentabilidade",
      content:
        "Redução de 20% no consumo de plástico até o final de 2026.",
      visibility: "PUBLIC",
    },
    {
      organizationId: greenFoods!.id,
      title: "Política de fornecedores",
      content:
        "Todos os fornecedores devem possuir certificação ambiental válida.",
      visibility: "RESTRICTED",
    },

    // FinWise
    {
      organizationId: finWise!.id,
      title: "Compliance financeiro",
      content:
        "Todas as transações acima de R$ 50.000 devem ser auditadas.",
      visibility: "RESTRICTED",
    },
    {
      organizationId: finWise!.id,
      title: "Código de conduta",
      content:
        "Os colaboradores devem seguir as diretrizes éticas e regulatórias da empresa.",
      visibility: "PUBLIC",
    },
    {
      organizationId: finWise!.id,
      title: "Política de acesso",
      content:
        "O acesso a dados sensíveis é concedido apenas mediante aprovação do gestor.",
      visibility: "RESTRICTED",
    },
  ]);

  console.log("🌱 Seed completed");
}

seed();