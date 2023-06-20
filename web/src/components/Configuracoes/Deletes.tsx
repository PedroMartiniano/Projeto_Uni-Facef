import { useState, useEffect } from "react";
import { CategoryData, LocationData } from "../../models/auxiliary-data";
import toast, { Toaster } from "react-hot-toast";
import api from "../../lib/axios";
import './Deletes.css';

export default function Deletes() {
    const [categorias, setCategorias] = useState<CategoryData[]>([]);
    const [localizacoes, setLocalizacoes] = useState<LocationData[]>([]);

    function getCategorias() {
        api.get("/consulta/categoria").then((response) => {
            setCategorias(response.data);
            if (response.data.length > 0) {
                setCategoria(response.data[0].id);
            }
        });
    }

    function getLocalizacoes() {
        api.get("/consulta/localizacao").then((response) => {
            setLocalizacoes(response.data);
            if (response.data.length > 0) {
                setLocalizacao(response.data[0].id);
            }
        });
    }

    useEffect(() => {
        getCategorias(), getLocalizacoes();
      }, []);

    const [categoria, setCategoria] = useState(0);
    const [localizacao, setLocalizacao] = useState(0);
    

    function deleteCategory(): any {
        api.delete(`deletar/categoria/${categoria}`)
            .then(() => {toast.success("Categoria deletada com sucesso!");})
            .catch(() => {toast.error("Erro ao deletar categoria!");});
    }

    function deleteLocation(): any {
        api.delete(`deletar/localizacao/${localizacao}`)
            .then(() => {toast.success("Localização deletada com sucesso!");})
            .catch(() => {toast.error("Erro ao deletar localização!");});
    }

    return (
        <div className="deleteForm">
            <div>
                <Toaster />
            </div>
            <ul>
                <li className="form-item">
                    <label>Deletar Categoria:</label>
                    {/*Select que mostra as categorias cadastradas. */}
                    <select
                        onChange={(event) => setCategoria(parseInt(event.target.value))}
                    >
                        {categorias.map((categoria) => (
                            <option value={categoria.id}>{categoria.nm_categoria}</option>
                        ))}
                    </select>
                    <button className="deleteButton" onClick={deleteCategory}>Deletar Categoria</button>
                </li>
                <li className="form-item">
                    <label>Deletar Localização:</label>
                    {/*Select que mostra as localizações cadastradas. */}
                    <select
                        onChange={(event) => setLocalizacao(parseInt(event.target.value))}
                    >
                        {localizacoes.map((localizacao) => (
                            <option value={localizacao.id}>{localizacao.nm_sala}</option>
                        ))}
                    </select>
                    <button className="deleteButton" onClick={deleteLocation}>Deletar Localização</button>
                </li>
            </ul>
        </div>
    )
}