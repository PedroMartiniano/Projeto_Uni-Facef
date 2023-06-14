import { useEffect, useState, useCallback } from "react";
import { User } from "../../models/user-data";
import api from "../../lib/axios";


export default function FetchUsers(){
    const [dataUser, setDataUser] = useState<User[]>([])

    const getUsers = useCallback(() => {
        api.get('/users').then((response) => { setDataUser(response.data); });
    }, []);

    useEffect(() => { getUsers() }, [getUsers])

    return dataUser
}