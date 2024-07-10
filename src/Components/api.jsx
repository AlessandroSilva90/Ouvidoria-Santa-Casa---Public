import axios from "axios";

export const api = axios.create({
    baseURL: "http://minha_api"
});


export const createChamado= async(tipo_chamado,nm_solicitante,sn_confidencial,nr_cpf,tp_retorno,telefone,email,cep,endereco,nr_casa,cd_setor,desc_caso,nm_documento,nm_paciente) =>{
    const data = await api.post('/setChamado',{tipo_chamado,nm_solicitante,sn_confidencial,nr_cpf,tp_retorno,telefone,email,cep,endereco,nr_casa,cd_setor,desc_caso,nm_documento,nm_paciente});
    return data.data;
}

export const getByCpf= async(cpf) =>{
    const data = await api.get(`/solicitante/${cpf}`);
    return data.data;
}

export const getSetores= async() =>{
    const data = await api.get(`/getListSetores`);
    return data.data;
}

export const getStatusByChamado = async (cd_chamado) =>{
    const data = await api.get(`/getSituacao/${cd_chamado}`);
    return data.data;
}

export const verifyUser = async(pass,chamado) => {
    const data = await api.get(`/getByPass/${pass}/${chamado}`);
    return data.data;
}
export const createChamadoAnonimo = async( tipo_chamado,sn_confidencial,cd_setor,desc_caso,nm_documento) =>{
    const data = await api.post('/setChamadoConfidencial',{tipo_chamado,sn_confidencial,cd_setor,desc_caso,nm_documento});
    return data.data;
}




