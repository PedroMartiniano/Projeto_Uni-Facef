// importações
import Fastify from 'fastify';	
import cors from '@fastify/cors';
import appRoutes from './routes';

//criando o servidor com o fastify
const app = Fastify();

//registrando os plugins
app.register(cors)
app.register(appRoutes)

//iniciando o servidor e configurando a porta
app.listen({
    port: 3333,
}).then(() =>{console.log('Server is running on port 3333')})