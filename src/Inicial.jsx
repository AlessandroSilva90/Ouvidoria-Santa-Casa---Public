import { useState } from "react";
import { verifyUser } from "./Components/api";
import { AuthContext } from "./Auth/AuthProvider";
import { useContext } from "react";

import { Link } from 'react-router-dom';

import "./inicial.css"

import ouvidoria_digital from "../src/assets/1.png";
import icone from "../src/assets/icone.png";
import tipos_chamado from "../src/assets/2.png";

import denuncia from "../src/assets/denuncia.png";
import elogios from "../src/assets/elogios.png";
import reclamacoes from "../src/assets/reclamacoes.png";
import sugestoes from "../src/assets/sugestoes.png";
import Swal from "sweetalert2";



const Inicial = () => {

    const [chamado,setChamado] = useState('');
    const [pass,setPass] = useState('');
    
    const {autenticado, login} = useContext(AuthContext)

    const logar = async  (e)=>{
        e.preventDefault();
       const response = await verifyUser(pass,chamado)       
        login(chamado,pass)
    }


    return ( 
        <>

        <div className="sectionOuvidoriaContent">
            <div className="ouvidoriaimg">
                <img src={icone} alt="Ouvidoria digital"/>
                <div className="ouvidoriaExplain">
                        <h1 style={{color:"white"}}>OUVIDORIA DIGITAL</h1>
                        <p>A Ouvidoria Digital da Santa Casa de Misericórdia de Sobral é um canal de contato e participação social para pacientes e colaboradores interagirem e compartilharem suas opiniões a fim de aprimorar os serviços hospitalares.
    Sua manifestação é importante para nós. </p>
                </div>
            </div>
        </div>

        <div className="choseManifest">

            <h1 >Manifestações</h1>
                <div className="explainManifest">
                    <label>Manifestação é como chamamos as suas interações com a Ouvidoria. Faça sua Manifestação abaixo. </label>
                </div>
                <div className="sectionButtonsManifest">
                    <div className="cadManifest">
                        <Link to='/cadastro' >
                            <button id="cadManifest" >Manifestação Não Anônima</button>
                        </Link>
                    </div>
                    <div className="ViewManifest">
                    <Link to='/anonimo' >
                    <button id="ViewManifest">Manifestação Anônima</button>
                    </Link>
                    </div>
                </div>
            <div className="optionsManifest">     

                <div className="consultaManifest">
                    <label><b>Consulta</b></label>
                    <form onSubmit={logar}>
                        <div className="contentInputsManifest">
                            <label>Chamado</label>
                            <input type="text" onChange={e => {setChamado(e.target.value)}} />
                        </div>
                        <div className="contentInputsManifest">
                            <label>Senha</label>
                            <input type="text" onChange={e=> {setPass(e.target.value)}} />
                        </div>
                        
                        <button>Buscar</button>
                        
                    </form>
                    <label>*Se você fez uma Manifestação anônima e não sabe o protocolo e a senha, a consulta de andamento só pode ser feita por telefone ou pessoalmente, na Ouvidoria. </label>
                </div>
            </div>
        </div>

        <div className="sectionOuvidoriaContentFoot">
            {/* <img src={tipos_chamado} /> */}
            <img src={elogios} />
            <img src={sugestoes} />
            <img src={reclamacoes} />
            <img src={denuncia} />
        </div>
        {/* <div className="TriangleRed"></div> */}
        </>
     );
}
 
export default Inicial;