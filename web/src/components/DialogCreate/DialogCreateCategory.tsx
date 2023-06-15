import "./DialogCreate.css";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import api from "../../lib/axios";
import toast from "react-hot-toast";

/*Função principal do componente de criação de categoria, onde é chamado o componente de dialog do radix-ui e o componente de toast do react-hot-toast. */
function DialogCreateCategory(props : any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  
    {/*Hook que armazena o valor da categoria. */}
    const [categoria, setCategoria] = useState("");

    {/*Objeto que armazena o valor da categoria. */}
    const novaCategoria = {
        categoria
    }
    {/*Função que faz a requisição para criar a categoria. */}
    function createCategoria() {
        api
        .post(`/cadastro/${props.tipo}`, novaCategoria)
        .then(() => toast.success("Categoria cadastrada com sucesso!"))
        .catch(() => toast.error("Erro ao cadastrar categoria!"))
    }

  return (
    <Dialog.Root>
      {/* Botão que chama o dialog de criação de categoria. */}
      <Dialog.Trigger type="button" className="modal-trigger">+</Dialog.Trigger>
      {/* Dialog de criação de categoria. */}
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          {/* Botão que fecha o dialog de criação de categoria. */}
          <Dialog.DialogClose className="modal-btn-close">X</Dialog.DialogClose>
          <Dialog.DialogTitle className="modal-title">Adicionar nova {props.tipo}</Dialog.DialogTitle>
          {/* Formulário de criação de categoria. */}
          <div>
          <label>Nome da nova {props.tipo}:</label>
          <input type="text" onChange={(event) => setCategoria(event.target.value)} />
          </div>
          {/* Botão que chama a função de criar a categoria. */}
          <button type="submit" onClick={createCategoria}>Adicionar</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogCreateCategory;
