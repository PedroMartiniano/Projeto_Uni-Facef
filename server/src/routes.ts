import { prisma } from "./lib/prisma";
import { z } from "zod";
import { FastifyInstance } from "fastify";

/* Função que define as rotas da aplicação */
export default async function appRoutes(app: FastifyInstance) {
  /* Rota para cadastrar um novo patrimônio */
  app.post("/cadastro", async (request) => {
    /* Define o formato dos dados que serão recebidos */
    const createPatrimonio = z.object({
      placa: z.string(),
      descricao: z.string(),
      categoria: z.number(),
      dataEntrada: z.string().transform((value) => new Date(value)),
      estadoConservacao: z.string(),
      valor: z.number(),
      localizacao: z.number(),
      status: z.string(),
    });

    /* Extrai os dados da requisição e valida o formato */
    const {
      placa,
      descricao,
      categoria,
      dataEntrada,
      estadoConservacao,
      valor,
      localizacao,
      status,
    } = createPatrimonio.parse(request.body);

    /* Cria um novo patrimônio no banco de dados */
    await prisma.patrimonio.create({
      data: {
        placa,
        descricao,
        dataEntrada,
        estado: estadoConservacao,
        valor,
        status,
        id_categoria: categoria,
        id_localizacao: localizacao,
      },
    });
  });

  /* Rota para cadastrar uma nova categoria */
  app.post("/cadastro/Categoria", async (request) => {
    /* Define o formato dos dados que serão recebidos */
    const createCategoria = z.object({
      categoria: z.string(),
    });
    /* Extrai os dados da requisição e valida o formato */
    const { categoria } = createCategoria.parse(request.body);

    /* Cria uma nova categoria no banco de dados */
    await prisma.categoria.create({
      data: {
        nm_categoria: categoria,
      },
    });
  });

  /* Rota para cadastrar uma nova localização */
  app.post("/cadastro/Localizacao", async (request) => {
    /* Define o formato dos dados que serão recebidos */
    const createLocalizacao = z.object({
      localizacao: z.string(),
    });

    /* Extrai os dados da requisição e valida o formato */
    const { localizacao } = createLocalizacao.parse(request.body);

    /* Cria uma nova localização no banco de dados */
    await prisma.localizacao.create({
      data: {
        nm_sala: localizacao,
      },
    });
  });

  /* Rota para consultar os patrimônios cadastrados */
  app.get("/consulta", async (request) => {
    /* Consulta os patrimônios cadastrados no banco de dados */
    const patrimonios = prisma.$queryRaw`
    SELECT P.id, P.placa, P.descricao, P.dataEntrada, P.estado, P.valor, P.status, C.nm_categoria, L.nm_sala, P.id_categoria, P.id_localizacao 
    FROM patrimonios P
    INNER JOIN categorias C ON P.id_categoria = C.id
    INNER JOIN localizacoes L ON P.id_localizacao = L.id
    `;

    /* Retorna os patrimônios */
    return patrimonios;
  });

  /* Rota para consultar as categorias cadastradas */
  app.get("/consulta/categoria", async (request) => {
    const categorias = prisma.categoria.findMany();
    return categorias;
  });

  /* Rota para consultar as localizações cadastradas */
  app.get("/consulta/localizacao", async (request) => {
    const localizacoes = prisma.localizacao.findMany();
    return localizacoes;
  });

  /* Rota para editar um patrimônio */
  app.patch("/atualizar", async (request) => {
    /* Define o formato dos dados que serão recebidos */
    const updatePatrimonio = z.object({
      id: z.number(),
      placa: z.string(),
      descricao: z.string(),
      categoria: z.number(),
      dataEntrada: z.string().transform((value) => new Date(value)),
      estadoConservacao: z.string(),
      valor: z.number(),
      localizacao: z.number(),
      status: z.string(),
    });

    /* Extrai os dados da requisição e valida o formato */
    const {
      id,
      placa,
      descricao,
      categoria,
      dataEntrada,
      estadoConservacao,
      valor,
      localizacao,
      status,
    } = updatePatrimonio.parse(request.body);

    /* Atualiza o patrimônio no banco de dados */
    await prisma.patrimonio.update({
      where: {
        id: id,
      },
      data: {
        placa,
        descricao,
        dataEntrada,
        estado: estadoConservacao,
        valor,
        status,
        id_categoria: categoria,
        id_localizacao: localizacao,
      },
    });
  });

  /* Rota para deletar um patrimonio */
  app.delete("/deletar/:id", async (request) => {
    /* Define o formato do id que será recebido */
    const deletarPatrimonio = z.object({
      id: z.string().transform((value) => Number(value)),
    });

    /* Extrai o id da requisição e valida o formato */
    const { id } = deletarPatrimonio.parse(request.params);

    /* Deleta o patrimônio no banco de dados */
    await prisma.patrimonio.delete({
      where: {
        id: id,
      },
    });
  });

  app.post('/user', async (request) => {
    const createUser = z.object({
      email: z.string(),
      nome: z.string(),
      senha: z.string()
    })

    const { email, nome, senha } = createUser.parse(request.body)

    const newUser = await prisma.user.create({
      data: {
        email,
        nome,
        senha
      }
    })

    return newUser
  })

  app.get('/users', async () => {
    const users = await prisma.user.findMany()
    return users
  })

  app.delete('/user/:id', async (request) => {
    const idParam = z.object({
        id: z.string()
    })

    const { id } = idParam.parse(request.params)

    const idNumber = Number(id)

    const userDeleted = await prisma.user.delete({
        where: {
            id: idNumber
        }
    })

    return userDeleted
})
}
