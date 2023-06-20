import { TableData } from "../../models/table-data";
import * as Dialog from "@radix-ui/react-dialog";
import FormUpdate from "../FormUpdate/FormUpdate";
import "./DialogUpdate.css";

// Função principal do componente de dialog de atualização, onde é chamado o componente de formulário de atualização do patrimônio.
function DialogUpdate(props: TableData) {
  return (
    // Componente de dialog de atualização do patrimônio.
    <Dialog.Root>
      {/*Componente de botão que abre o dialog de atualização do patrimônio.*/}
      <Dialog.Trigger value={props.id} type="button">
        <img src="src\assets\Edit.svg" alt="" />
      </Dialog.Trigger>
      {/*Componente de portal que armazena o dialog de atualização do patrimônio.*/}
      <Dialog.Portal>
        {/*Componente de overlay que escurece a tela quando o dialog de atualização do patrimônio é aberto.*/}
        <Dialog.Overlay className="modal-overlay" />
        {/*Componente de conteúdo que armazena o dialog de atualização do patrimônio.*/}
        <Dialog.Content className="modal-content">
          {/*Componente de botão que fecha o dialog de atualização do patrimônio.*/}
          <Dialog.DialogClose className="modal-btn-close">X</Dialog.DialogClose>
          {/*Componente de título que exibe o título do dialog de atualização do patrimônio.*/}
          <Dialog.DialogTitle className="modal-title">Ajustar Patrimonio</Dialog.DialogTitle>
          {/*Componente de formulário de atualização do patrimônio.*/}
          <FormUpdate {...props} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogUpdate;
