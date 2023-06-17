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

  // Rota para cadastrar um novo usuário
  app.post('/user', async (request) => {
    // Define o formato dos dados que serão recebidos
    const createUser = z.object({
      email: z.string(),
      nome: z.string(),
      senha: z.string()
    })

    // Extrai os dados da requisição e valida o formato
    const { email, nome, senha } = createUser.parse(request.body)

    // Cria um novo usuário no banco de dados
    const newUser = await prisma.user.create({
      data: {
        email,
        nome,
        senha
      }
    })

    // Retorna o usuário criado
    return newUser
  })

  // Rota para consultar todos os usuários cadastrados no banco de dados
  app.get('/users', async () => {
    // Consulta os usuários cadastrados no banco de dados
    const users = await prisma.user.findMany()
    // Retorna os usuários
    return users
  })

  app.post('/user/verif', async (request) => {
    const verifBody = z.object({
      email: z.string(),
      senha: z.string()
    })

    const { email, senha } = verifBody.parse(request.body)
    const verif = await prisma.user.findFirst({
      where: {
        email,
        senha
      }

    })

    return verif
  })

  // Rota para deletar um usuário especifico pelo seu id no banco de dados
  app.delete('/user/:id', async (request) => {
    // Define o formato do id que será recebido
    const idParam = z.object({
      id: z.string()
    })

    // Extrai o id da requisição e valida o formato
    const { id } = idParam.parse(request.params)

    // Converte o id para o tipo number
    const idNumber = Number(id)

    // Deleta o usuário no banco de dados
    const userDeleted = await prisma.user.delete({
      where: {
        id: idNumber
      }
    })

    // Retorna o usuário deletado
    return userDeleted
  })
}
