import React, {useState,createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from '../Components/api';
import Swal from 'sweetalert2';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();
    
    const [gToken, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contador, setContador] = useState(0);

    useEffect(()=>{
        const recoveredTokenPass = localStorage.getItem('pass');
        const recoveredTokenChamado = localStorage.getItem('chamado');
        if(recoveredTokenPass && recoveredTokenChamado){
            setToken(JSON.parse(recoveredTokenPass));
        }
        setLoading(false);
    },[]);

    const login = async (chamado,pass) => {
        // API PARA CRIAR LOGIN
        const response = await verifyUser(pass,chamado);  
        let cont = 0;  
        // console.log(response)
        if(response != 'Sem dados'){
            const userPass = response[0].chave_acesso;
            const userChamado = response[0].cd_chamado;
        // Deixar as informações armazenadas
            localStorage.setItem('chamado', JSON.stringify(userChamado));
            localStorage.setItem('pass', JSON.stringify(userPass));
            setToken(userChamado);
            navigate("/acompanhamento");
        }else{
            Swal.fire('Chamado ou Senha incorretos, tente novamente');
        }
      };

    const logout = () =>{
        localStorage.removeItem('chamado');
        localStorage.removeItem('pass');
            setToken(null);
            navigate('/');
        };

    return ( 
        <AuthContext.Provider value={{autenticado: !!gToken, gToken, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider ;