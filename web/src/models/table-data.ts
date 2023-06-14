/*Modelo de dados para a tabela de bens patrimoniais*/
export interface TableData {
    id: number;
    placa: string;
    descricao: string;
    dataEntrada: string;
    estadoConservacao: string;
    estado: string;
    valor: number;
    status: string;
    nm_categoria: string;
    nm_sala: string;
    id_categoria: number;
    id_localizacao: number;
}