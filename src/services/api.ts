import axios from 'axios';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
});

interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  status?: 'DESAPARECIDO' | 'LOCALIZADO'; 
}
export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
export interface FiltrosBusca {
  pagina?: number;
  porPagina?: number;
  nome?: string;
  status?: 'DESAPARECIDO' | 'LOCALIZADO' | '';
  sexo?: 'MASCULINO' | 'FEMININO' | '';
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
}

export const getPessoas = async (filtros: FiltrosBusca): Promise<PaginatedResponse<Pessoa>> => {
  const params = {
    pagina: filtros.pagina || 0,
    porPagina: filtros.porPagina || 12,
    nome: filtros.nome || '',
    status: filtros.status || 'DESAPARECIDO',
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 120,
    sexo: '',
  };

  try {
    const response = await api.get('/pessoas/aberto/filtro', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pessoas na API real:', error);
    throw error;
  }
};
export const getPersonById = async (id: number): Promise<Pessoa> => {
  try {
    const response = await api.get(`/pessoas/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar pessoa com ID ${id}:`, error);
    throw error;
  }
};

export default api;