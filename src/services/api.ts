import axios from 'axios';

// URL base da API, incluindo a versão
const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
});

// --- INTERFACES DE TIPO DETALHADAS ---
// Baseado na documentação do Swagger

// Interface para a estrutura de uma ocorrência dentro de uma Pessoa
interface UltimaOcorrencia {
  dtDesaparecimento: string;
  dataLocalizacao: string | null;
  encontradoVivo: boolean;
  status: 'DESAPARECIDO' | 'LOCALIZADO';
}

// Interface principal para uma Pessoa
export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: 'MASCULINO' | 'FEMININO';
  urlFoto: string;
  ultimaOcorrencia: UltimaOcorrencia;
}

// Interface para a resposta paginada da API
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // número da página atual
  size: number; // tamanho da página
}

// Interface para todos os possíveis filtros de busca
export interface FiltrosBusca {
  pagina?: number;
  porPagina?: number;
  nome?: string;
  status?: 'DESAPARECIDO' | 'LOCALIZADO' | '';
  sexo?: 'MASCULINO' | 'FEMININO' | '';
  faixaIdadeInicial?: number;
  faixaIdadeFinal?: number;
}


// --- FUNÇÃO DE CHAMADA REAL ---
export const getPessoas = async (filtros: FiltrosBusca): Promise<PaginatedResponse<Pessoa>> => {
  // Valores padrão para a requisição
  const params = {
    pagina: filtros.pagina || 0,
    porPagina: filtros.porPagina || 10,
    nome: filtros.nome || '',
    status: filtros.status || '',
    sexo: filtros.sexo || '',
    faixaIdadeInicial: filtros.faixaIdadeInicial || 0,
    faixaIdadeFinal: filtros.faixaIdadeFinal || 120,
  };

  try {
    const response = await api.get('/pessoas/aberto/filtro', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pessoas na API real:', error);
    throw error;
  }
};

export default api;