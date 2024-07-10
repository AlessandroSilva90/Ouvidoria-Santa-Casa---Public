import { useEffect, useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import {
  createChamado,
  createChamadoAnonimo,
  getSetores,
} from "./Components/api";
import Swal from "sweetalert2";

function Anonimo() {
  const [tipo_chamado, setTpChamado] = useState("");
  const [sn_confidencial, setConfidencial] = useState("S");
  const [cd_setor, setSetor] = useState("");
  const [desc_caso, setDescCaso] = useState("");
  const [nm_documento, setDocumento] = useState("");

  const [SetoresList, setSetoresList] = useState([""]);

  useEffect(() => {
    async function getSetor() {
      const setores = await getSetores();
      setSetoresList(setores);
    }
    getSetor();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipo_chamado == "" || desc_caso == "" || cd_setor == "") {
      Swal.fire({
        // title: "Manifestação Cadastrada",
        text: "Preencha os campos obrigatórios",
        icon: "error",
      });
    } else {
      const data = await createChamadoAnonimo(
        tipo_chamado,
        sn_confidencial,
        Number(cd_setor),
        desc_caso,
        nm_documento
      );
      if (data) {
        Swal.fire({
          title: "Manifestação Cadastrada",
          html: `Anote o protocolo e senha da sua manifestação e consulte-a aqui. Seu Protocolo é: <b>${data.id}</b> e sua Senha é: <b>${data.pass}</b>.
           Sua solicitação foi encaminhada e terá retorno em breve.`,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    }
  };

  return (
    <div className="contentBody" style={{ minHeight: "100vh" }}>
      <Container>
        <p className="descManifest">
          *Manifestação é como chamamos as suas interações com a Ouvidoria. Faça
          sua Manifestação abaixo.
        </p>
        <p className="descManifest">
          *<b>Elogios</b> não poderão ser feitos anonimamente, apenas através do
          ícone: "Manifestação Não Anônima".
        </p>
        <form onSubmit={handleSubmit}>
          <div className="manifestContent">
            <div className="rowDoubleIni">
              <div className="itemInput">
                <label>Tipo de Manifestação</label>
                <label style={{ color: "red" }}>*</label>
                <select
                  name=""
                  id=""
                  onChange={(e) => setTpChamado(e.target.value)}
                >
                  <option value=""></option>
                  <option value="SUGESTAO">Sugestão</option>
                  {/* <option value="ELOGIO">Elogio</option> */}
                  <option value="RECLAMACAO">Reclamação</option>
                  <option value="DENUNCIA">Denuncia</option>
                </select>
              </div>
            </div>

            <div className="fieldset">
              <label className="panel-Title">Descrição da Manifestação</label>
              <div className="itemInput">
                <label>
                  Setor para o qual você quer abrir uma manifestação
                </label>
                <select
                  name="setorList"
                  id="setorList"
                  onChange={(e) => setSetor(e.target.value)}
                >
                  <option value="">Selecione o setor</option>
                  {SetoresList.map((item, index) => (
                    <option value={item["codigo"]} key={index}>
                      {item["nome"]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="itemInput">
                <label>Descrição do Caso</label>
                <label style={{ color: "red" }}>*</label>
                <textarea
                  name=""
                  id=""
                  rows="10"
                  style={{ width: "100%" }}
                  onChange={(e) => setDescCaso(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="btnSecction">
              <input
                type="submit"
                className="btns"
                style={{ background: "#ca292d" }}
                value="Enviar Manifestação"
              />
              <label
                className="btns"
                style={{ background: "#29cac6", cursor: "pointer" }}
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Voltar
              </label>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Anonimo;
