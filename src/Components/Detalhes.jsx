import { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getByCpf, getStatusByChamado } from './api';


function Detalhes(props) {
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const [dados,setDados] = useState([]);

  
  function handleShow(breakpoint) {
    setLgShow(true)    
  }

  useEffect(()=>{
    async function getDados2(){
        const response = await getStatusByChamado(props.chamado)
        setDados(response)
    }getDados2()
  },[props.chamado]);

  
const returnAllItens2 = (val, index) =>{
  if(val['sn_confidencial'] == 'S'){
    return(
      <ul key={index}>
        <li><label>Solicitante:</label> Anônimo</li>
      </ul>
    )
  }else{
    return(
        <ul key={index}>
            <li><label>Solicitante: </label> {val['nm_solicitante']}</li>
            <li><label>CPF: </label> {val['nr_cpf']}</li>
            <li><label>Email: </label> {val['email']}</li>
            <li><label>Telefone: </label> {val['telefone']}</li>
            <li><label>Endereço: </label> {val['endereco']}</li>
            <li><label>Cep: </label> {val['cep']}</li>
            <li><label>N° Casa: </label> {val['nr_casa']}</li>
        </ul>
        )
  }
    }

const returnAllItensManifestacao = (val, index) =>{
    return(
        // details.map((val, index)=> (
        <ul key={index}>
            <li><label>Setor da Manifestação: </label> {val['cd_setor']}</li>
            <li><label>Manifestação: </label> </li>
            <textarea style={{width:"100%"}} rows="10" value={val['desc_caso']} disabled ></textarea>

        </ul>
        )
    }
    const returnAllItensResposta = (val, index) =>{
      return(
          // details.map((val, index)=> (
          <ul key={index}>
              <li><label>Resposta: </label></li>
              {val['devolutiva_final'] ? 
              <textarea style={{width:"100%"}} rows="10" value={val['devolutiva_final']} disabled ></textarea> : <textarea style={{width:"100%"}} rows="10" value="Aguardando resposta" disabled ></textarea> 
              }
  
          </ul>
          )
      }

  return (
    <>
      <Button  onClick={() => handleShow(true)}>Histórico</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          Histórico
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="fieldset">
                <label className='panel-Title'>Informações Pessoais</label>
                {dados.map(returnAllItens2)}
            </div>
            <div className="fieldset">
                <label className='panel-Title'>Descrição da Manifestação</label>
                {dados.map(returnAllItensManifestacao)}
            </div>
            <div className="fieldset">
                <label className='panel-Title'>Respostas</label>
                {dados.map(returnAllItensResposta)}
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Detalhes;