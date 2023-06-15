import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./AlertDelete.css";
import { TableData } from "../../models/table-data";
import api from "../../lib/axios";
import toast, { Toaster } from "react-hot-toast";

/*Função principal do componente de alerta de exclusão de patrimônio, onde é chamado o componente de alerta do radix-ui e o componente de toast do react-hot-toast. */
function AlertDelete(props: TableData) {
  /*Função que faz a requisição para deletar o patrimônio. */
  function deletePatrimonio() {
    api
      /*Requisição para deletar o patrimônio. */
      .delete(`/deletar/${props.id}`)
      /*Caso a requisição seja bem sucedida, é exibido um toast de sucesso. */
      .then(() => toast.success("Patrimonio deletado com sucesso!"))
      /*Caso a requisição seja mal sucedida, é exibido um toast de erro. */
      .catch(() => toast.error("Erro ao deletar patrimonio!"));
  }

  return (
    <AlertDialog.Root>
      <div>
        <Toaster />
      </div>
      {/* Botão que chama o alerta de exclusão de patrimônio. */}
      <AlertDialog.Trigger asChild>
        <button className="Button violet">
          <img src="src\assets\delete-icon.svg" alt="" />
        </button>
      </AlertDialog.Trigger>
      {/* Alerta de exclusão de patrimônio. */}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="alert-overlay" />
        <AlertDialog.Content className="alert-content">
          <AlertDialog.Title className="alert-title">
            Você tem certeza que deseja excluir o registro?
          </AlertDialog.Title>
          <AlertDialog.Description className="AlertDialogDescription">
            Está ação não pode ser desfeita. O patrimonio: {props.placa} será
            excluido permanentemente.
          </AlertDialog.Description>
          <div>
            {/* Botão que chama a função de deletar o patrimônio. */}
            <AlertDialog.Action asChild>
              <button className="alert-btn" onClick={deletePatrimonio}>
                Sim, excluir o registro
              </button>
            </AlertDialog.Action>
            {/* Botão que fecha o alerta de exclusão de patrimônio. */}
            <AlertDialog.Cancel asChild>
              <button className="alert-btn">Cancelar</button>
            </AlertDialog.Cancel>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default AlertDelete;
