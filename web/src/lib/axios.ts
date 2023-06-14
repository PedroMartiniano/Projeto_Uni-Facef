/* Criando uma instância do axios para que todas as requisições tenham a mesma base URL */
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
})

export default api;