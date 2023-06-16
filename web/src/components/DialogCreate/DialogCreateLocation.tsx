import "./DialogCreate.css";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import api from "../../lib/axios";
import toast from "react-hot-toast";

/*Função principal do componente de criação de localização, onde é chamado o componente de dialog do radix-ui e o componente de toast do react-hot-toast. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DialogCreateLocation(props : any) {

    {/*Hook que armazena o valor da localização. */}
    const [localizacao, setLocalizacao] = useState("");

    {/*Objeto que armazena o valor da localização. */}
    const novaLocalizacao = {
        localizacao
    }

    {/*Função que faz a requisição para criar a localização. */}
    function createLocalizacao() {
        
        api
        .post(`/cadastro/Localizacao`, novaLocalizacao)
        .then(() => toast.success("Localização cadastrada com sucesso!"))
        .catch(() => toast.error("Erro ao localização categoria!"))
    }
    

  return (
    <Dialog.Root>
      {/* Botão que chama o dialog de criação de localização. */}
      <Dialog.Trigger type="button" >+</Dialog.Trigger>
      <Dialog.Portal>
        {/* Dialog de criação de localização. */}
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          {/* Botão que fecha o dialog de criação de localização. */}
          <Dialog.DialogClose className="modal-btn-close">X</Dialog.DialogClose>
          <Dialog.DialogTitle className="modal-title">Adicionar nova {props.tipo}</Dialog.DialogTitle>
          {/* Formulário de criação de localização. */}
          <div>
          <label>Nome da nova {props.tipo}:</label>
          <input className="create-input" type="text" onChange={(event) => setLocalizacao(event.target.value)} />
          </div>
          {/* Botão que chama a função de criar a localização. */}
          <button className="create-button" type="submit" onClick={createLocalizacao}>Adicionar</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogCreateLocation;
