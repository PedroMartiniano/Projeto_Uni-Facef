import "./Form.css";
import { useState, FormEvent, useEffect } from "react";
import api from "../../lib/axios";
import toast, { Toaster } from "react-hot-toast";
import { CategoryData, LocationData } from "../../models/auxiliary-data";
import DialogCreateCategory from "../DialogCreate/DialogCreateCategory";
import DialogCreateLocation from "../DialogCreate/DialogCreateLocation";

/*Função principal do componente de formulário, onde é chamado o componente de dialog de criação de categoria, o componente de dialog de criação de localização e o componente de toast do react-hot-toast. */
function Form() {

  {/*Hooks que armazenam os valores das categorias e das localizações. */ }
  const [categorias, setCategorias] = useState<CategoryData[]>([]);
  const [localizacoes, setLocalizacoes] = useState<LocationData[]>([]);

  {/*Funções que fazem as requisições para pegar as categorias e as localizações. */ }
  function getCategorias() {
    api.get("/consulta/categoria").then((response) => { setCategorias(response.data) })
  }

  function getLocalizacoes() {
    api.get("/consulta/localizacao").then((response) => { setLocalizacoes(response.data) })
  }

  {/*Hook que executa as funções que buscam as categorias e as localizações */ }
  useEffect(() => { getCategorias(), getLocalizacoes() }, [])

  {/*Hooks que armazenam os valores dos campos do formulário. */ }
  const [placa, setPlaca] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState(0);
  const [dataEntrada, setDataEntrada] = useState("");
  const [estadoConservacao, setEstadoConservacao] = useState("Execelente");
  const [valor, setValor] = useState(0);
  const [localizacao, setLocalizacao] = useState(0);

  {/*Objeto que armazena os valores dos campos do formulário. */ }
  const patrimonio = {
    placa,
    descricao,
    categoria,
    dataEntrada,
    estadoConservacao,
    valor,
    localizacao,
    status: "Ativo",
  };

  {/*Função que faz a requisição para criar o patrimônio. */}
  function createPatrimonio(event: FormEvent) {
    event.preventDefault();
    api
      .post("/cadastro", patrimonio)
      .then(() => toast.success("Patrimônio cadastrado com sucesso!"))
      .catch(() => toast.error("Erro ao cadastrar patrimônio!"));
  }

  return (
    <div className="form-container">
      <div>
        <Toaster />
      </div>
      { /*Formulário de cadastro de patrimônio. */
        /*Cada campo do formulário é um item de uma lista. */
        /*O campo de categoria e de localização são selects que mostram as categorias e as localizações cadastradas. */
        /*Os botões de categoria e de localização chamam os componentes de dialog de criação de categoria e de localização. */}
      <form className="form-list" onSubmit={createPatrimonio}>
        {/*Campos do formulário. */}
        <ul>
          <li className="form-item">
            <label>Placa do Patrimonio</label>
            <input
              type="string"
              onChange={(event) => setPlaca(event.target.value)}
            />
          </li>
          <li className="form-item">
            <label>Descrição</label>
            <input
              type="text"
              onChange={(event) => setDescricao(event.target.value)}
            />
          </li>
          <li className="form-item">
            <label>Categoria</label>
            {/*Chamada do componente de dialog de criação de categoria. */}
            <DialogCreateCategory tipo="Categoria"/>
            {/*Select que mostra as categorias cadastradas. */}
            <select onChange={(event) => setCategoria(parseInt(event.target.value))}>
              {categorias.map((categoria) => (  
                <option value={categoria.id}>{categoria.nm_categoria}</option>
              ))}
            </select>
          </li>
          <li className="form-item">
            <label>Data de entrada</label>
            <input
              type="date"
              // o cadastro de data, estava sempre cadastrando um dia a menos, então manualmente adicionamos um dia a mais
              onChange={(event) => {
                const selectedDate = new Date(event.target.value);
                selectedDate.setDate(selectedDate.getDate() + 1); // Adiciona um dia à data selecionada
                const formattedDate = selectedDate.toISOString().split("T")[0];
                setDataEntrada(formattedDate);
              }}
            />
          </li>
          <li className="form-item">
            <label>Estado de conservação</label>
            <select
              onChange={(event) => setEstadoConservacao(event.target.value)}
            >
              <option value="Execelente">Execelente</option>
              <option value="Otimo">Ótimo</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
              <option value="Pessimo">Péssimo</option>
            </select>
          </li>
          <li className="form-item">
            <label>Valor</label>
            <input
              type="text"
              onChange={(event) => setValor(parseInt(event.target.value))}
            />
          </li>
          <li className="form-item">
            <label>Localização</label>
            {/*Chamada do componente de dialog de criação de localização. */}
            <DialogCreateLocation tipo="Localização" />
            {/*Select que mostra as localizações cadastradas. */}
            <select onChange={(event) => setLocalizacao(parseInt(event.target.value))}>
              {localizacoes.map((localizacao) => (
                <option value={localizacao.id}>{localizacao.nm_sala}</option>
              ))}
            </select>
          </li>
        </ul>
        <button type="submit" className="form-btn">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Form;
