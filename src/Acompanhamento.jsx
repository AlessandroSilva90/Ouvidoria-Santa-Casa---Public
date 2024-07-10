import { Container } from "react-bootstrap";
import TableComponent from "./Components/TableComponent";
import Swal from "sweetalert2";

import { useContext,useState, useEffect } from "react";
import PaginatorAcompanhamento from "./Components/PaginatorAcompanhamento";
import { getByCpf } from "./Components/api";
import { AuthContext } from "./Auth/AuthProvider";

const Acompanhamento = () => {
  
    const {logout} = useContext(AuthContext);
    const [dados, setDados] = useState(['']);

    useEffect(()=>{
        async function iniciaDados(){
            const data = await getByCpf(localStorage.getItem('chamado'));
            setDados(data)
        }
        iniciaDados()
    },[])
    
  const returnDados = () =>{
    if(dados == null || dados == 'Sem dados'){
      Swal.fire({
          icon: 'error',
          title: 'Oops, Sem retorno ainda',
        });
        setDados(['']);
    }else   return(<PaginatorAcompanhamento data={dados}/> );
}

    return ( 
        <Container>
          <div className="inptSearch">
            <form >
            <button id="cadManifest" onClick={()=>{logout()}}>SAIR</button>
            </form>
          </div>
        
        <div className="mainPage">
        <h1>Manifestações</h1>  
        <div className='qrsCards'>
          <div className="titleDiv">
          </div>
            <TableComponent striped> 
            <thead>
              <tr>
                <th>Chamado</th>
                <th>Situação</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Visualizar</th>
                {/* <th>Setor</th> */}
              </tr>
            </thead>
              {returnDados()}
          </TableComponent>
      
      </div>
      </div>
      </Container>
     
    );
}
 
export default Acompanhamento;