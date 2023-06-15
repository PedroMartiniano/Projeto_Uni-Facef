// importações
import { useEffect, useState, useCallback } from "react";
import { User } from "../../models/user-data";
import api from "../../lib/axios";

// função que faz a requisição para pegar todos os usuários do banco de dados
export default function FetchUsers(){
    const [dataUser, setDataUser] = useState<User[]>([])

    const getUsers = useCallback(() => {
        api.get('/users').then((response) => { setDataUser(response.data); });
    }, []);

    useEffect(() => { getUsers() }, [getUsers])

    return dataUser
}