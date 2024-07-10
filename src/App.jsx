import { useEffect, useState } from 'react'
import './App.css'
import { Container } from 'react-bootstrap';
import { createChamado, getSetores } from './Components/api';
import Swal from 'sweetalert2';

function App() {
  const [tipo_chamado,setTpChamado] = useState('');
  const [nm_solicitante, setNmSolicitante] = useState('');
  const [nm_paciente, setNmPaciente] = useState('');
  const [sn_confidencial, setConfidencial] = useState('N');
  const [nr_cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [tp_retorno, setRetorno] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nr_casa, setNrCasa] = useState('');
  const [cd_setor, setSetor] = useState('');
  const [desc_caso, setDescCaso] = useState('');
  const [nm_documento, setDocumento] = useState('');

  const [SetoresList, setSetoresList] = useState(['']);

  // const [sn_confidencialShow, setConfidencialShow] = useState('');
  useEffect(()=>{
    async function getSetor(){
      const setores = await getSetores();
      setSetoresList(setores);
    }getSetor()
  },[])


  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(tp_retorno == "" || tipo_chamado == "" || desc_caso == "" || cd_setor == ""){
      Swal.fire({
        // title: "Manifestação Cadastrada",
        text: "Preencha os campos obrigatórios",
        icon: "error"
      });
    }else{
      const data = await createChamado( tipo_chamado,nm_solicitante,sn_confidencial,nr_cpf,tp_retorno,telefone,email,cep,endereco,nr_casa,Number(cd_setor),desc_caso,nm_documento,nm_paciente);  
      Swal.fire({
        title: "Manifestação Cadastrada",
        icon: "success"
      })

      if(data){
        Swal.fire({
          title: "Manifestação Cadastrada",
          html: `Anote o protocolo e senha da sua manifestação e consulte-a aqui. Seu Protocolo é: <b>${data.id}</b> e sua Senha é: <b>${data.pass}</b>.
           Sua solicitação foi encaminhada e terá retorno em breve.`,
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }});
      }

    }
    
  }

  return (
    <Container>
      <p className='descManifest'>*Manifestação é como chamamos as suas interações com a Ouvidoria. Faça sua Manifestação abaixo.</p>
      <form onSubmit={handleSubmit}>
      <div className="manifestContent">
        <div className="rowDoubleIni">
          <div className="itemInput">
            <label>Preferência de Resposta</label><label style={{color:'red'}}>*</label>
            <select name="" id="" onChange={(e)=> setRetorno(e.target.value)}>
              <option value=""></option>
              <option value="Email">Email</option>
              <option value="Site">Site</option>
            </select>
          </div>
          <div className="itemInput">
            <label>Tipo de Manifestação</label><label style={{color:'red'}}>*</label>
            <select name="" id="" onChange={(e)=> setTpChamado(e.target.value)}>
              <option value=""></option>
              <option value="SUGESTAO">Sugestão</option>
              <option value="ELOGIO">Elogio</option>
              <option value="RECLAMACAO">Reclamação</option>
              <option value="DENUNCIA">Denuncia</option>
            </select>
          </div>

        </div>

        <div className="fieldset">
        <label className='panel-Title'>Dados do Manifestante</label>
        <div className="rowDouble">
          <div className="itemInput">
            <label>Nome Completo</label><label style={{color:'red'}}>*</label>
            <input required type="text" name="nm_solicitante" id="nm_solicitante" onChange={(e)=> setNmSolicitante(e.target.value)} />
          </div>
          <div className="itemInput">
            <label>Nome Paciente</label>
            <input type="text" name="nm_paciente" id="nm_paciente" onChange={(e)=> setNmPaciente(e.target.value)} />
          </div>
          
        </div>
          <div className="rowDouble">
          <div className="itemInput">
            <label>CPF</label><label style={{color:'red'}}>*</label>
            <input required type="text" name="cpf" id="cpf" onChange={(e)=> setCpf(e.target.value)} />
          </div>
            <div className="itemInput">
              <label>Email</label><label style={{color:'red'}}>*</label>
              <input required type="email" name="email" id="email" onChange={(e)=> setEmail(e.target.value)} />
            </div>
          </div>
          <div className="rowDouble">
            <div className="itemInput">
              <label>Telefone</label><label style={{color:'red'}}>*</label>
              <input required type="text" name="telefone" id="telefone" onChange={(e)=> setTelefone(e.target.value)} />
            </div>
          <div className="itemInput">
              <label>CEP</label>
              <input  type="text" name="cep" id="cep" onChange={(e)=> setCep(e.target.value)} />
            </div>
            <div className="itemInput">
              <label>Endereço</label>
              <input  type="text" name="endereco" id="endereco" onChange={(e)=> setEndereco(e.target.value)} />
            </div>
            <div className="itemInput">
              <label>N° Casa</label>
              <input  type="text" name="n_Casa" id="n_Casa" onChange={(e)=> setNrCasa(e.target.value)} />
            </div>

          </div>

        </div>

        <div className="fieldset">
          
          <label className='panel-Title'>Descrição da Manifestação</label>
          <div className="itemInput">
            <label>Setor para o qual você quer abrir uma manifestação</label>
            <select name="setorList" id="setorList" onChange={(e)=> setSetor(e.target.value)}>
              <option value="">Selecione o setor</option>
              {SetoresList.map((item,index)=>(
                <option value={item['codigo']} key={index} >{item['nome'] }</option>

              ))}
              

            </select>
          </div>
          <div className="itemInput">
            <label>Descrição do Caso</label><label style={{color:'red'}}>*</label>
            <textarea name="" id="" cols="155" rows="10" onChange={(e)=> setDescCaso(e.target.value)} ></textarea>
          </div>
          {/* <div className="itemInput">
            <label>Anexar Documento</label>
            <input required type="file" name="" id="" onChange={(e)=> setDocumento(e.target.value)} />
          </div> */}
{/* 
          <div className="rowDoubleCheck">
            <input required type="checkbox" name="" id="" />
            <label>Declaro que as informações acima são verdadeiras e estou ciente de estar sujeito às penas da legislação pertinente caso tenha afirmado falsamente os dados preenchidos.</label>
          </div> */}

        </div>
      <div className="btnSecction">
          <input type="submit" className="btns" style={{background:"#ca292d"}} value='Enviar Manifestação'/>
          <label className="btns" style={{background:"#29cac6", cursor:'pointer'}} onClick={()=>{window.location.href= "/"}} >Voltar</label>
      </div>

        </div>
        </form>
        </Container>
  )
}

export default App
