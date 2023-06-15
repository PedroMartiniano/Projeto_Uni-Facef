import "./Table.css";
import api from "../../lib/axios";
import { useEffect, useState } from "react";
import { TableData } from "../../models/table-data";
import AlertDelete from "../AlertDelete/AlertDelete";
import DialogUpdate from "../DialogUpdate/DialogUpdate";

/*Função principal do componente de tabela, onde é chamado o componente de alerta de exclusão e o componente de diálogo de atualização. */
function Table() {

  {/*Hook que armazena os valores dos campos do formulário. */}
  const [tableData, setTableData] = useState<TableData[]>([]);

  {/*Função que faz a requisição para pegar os patrimônios. */}
  function getTableData() {
    api.get("/consulta").then((response) => setTableData(response.data));
  }

  {/*Hook que executa a função que busca os patrimônios. */}
  useEffect(() => {
    getTableData();
  }, []);

  return (
    <div className="table-container">
      {/*Cabeçalho da tabela. */}
      <table>
        <thead className="table-header">
          <tr>
            <th>Placa</th>
            <th>Descricao</th>
            <th>Categoria</th>
            <th>Data de Entrada</th>
            <th>Estado</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Localizacao</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        { /*Corpo da tabela. */
          /*Verifica se há dados na tabela. */
          /*Se houver, mapeia os dados e os exibe na tabela. */
          /*Se não houver, exibe uma mensagem de que não há dados. */}
        {tableData?.length > 0 ? (
          tableData.map((data) => (
            <tbody className="table-body">
              <tr>
                <td>{data.placa}</td>
                <td>{data.descricao}</td>
                <td>{data.nm_categoria}</td>
                <td>{new Date(data.dataEntrada).toLocaleDateString()}</td>
                <td>{data.estado}</td>
                <td>{data.valor}</td>
                <td>{data.status}</td>
                <td>{data.nm_sala}</td>
                <td>
                  <DialogUpdate {...data} />
                </td>
                <td>
                  <AlertDelete {...data} />
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          <p>Nenhum dado encontrado</p>
        )}
      </table>
    </div>
  );
}

// Exporta o componente de tabela.
export default Table;
