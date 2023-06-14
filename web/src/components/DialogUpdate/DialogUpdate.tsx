import { TableData } from "../../models/table-data";
import * as Dialog from "@radix-ui/react-dialog";
import FormUpdate from "../FormUpdate/FormUpdate";
import "./DialogUpdate.css";

function DialogUpdate(props: TableData) {
  return (
    <Dialog.Root>
      <Dialog.Trigger value={props.id} type="button">
        <img src="src\assets\patch-icon.svg" alt="" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <Dialog.DialogClose className="modal-btn-close">X</Dialog.DialogClose>
          <Dialog.DialogTitle className="modal-title">Ajustar Patrimonio</Dialog.DialogTitle>
          <FormUpdate {...props} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogUpdate;
