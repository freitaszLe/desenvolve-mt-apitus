import type { Pessoa as RealPessoa, PaginatedResponse as RealPaginatedResponse, FiltrosBusca as RealFiltrosBusca } from './api';

export interface Pessoa extends RealPessoa {}
export interface PaginatedResponse<T> extends RealPaginatedResponse<T> {}
export interface FiltrosBusca extends RealFiltrosBusca {}

// Uma base de dados maior para testar paginação e filtros
const allMockPessoas: Pessoa[] = [
  { id: 1, nome: 'João da Silva', idade: 32, sexo: 'MASCULINO', urlFoto: 'https://i.pravatar.cc/150?img=1', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-05-10', dataLocalizacao: null, encontradoVivo: false } },
  { id: 2, nome: 'Maria Oliveira', idade: 25, sexo: 'FEMININO', urlFoto: 'https://i.pravatar.cc/150?img=2', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-06-20', dataLocalizacao: null, encontradoVivo: false } },
  { id: 3, nome: 'Pedro Martins', idade: 45, sexo: 'MASCULINO', urlFoto: 'https://i.pravatar.cc/150?img=3', ultimaOcorrencia: { status: 'LOCALIZADO', dtDesaparecimento: '2024-01-01', dataLocalizacao: '2024-02-15', encontradoVivo: true } },
  { id: 4, nome: 'Ana Souza', idade: 19, sexo: 'FEMININO', urlFoto: 'https://i.pravatar.cc/150?img=4', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-07-11', dataLocalizacao: null, encontradoVivo: false } },
  { id: 5, nome: 'Carlos Pereira', idade: 56, sexo: 'MASCULINO', urlFoto: 'https://i.pravatar.cc/150?img=5', ultimaOcorrencia: { status: 'LOCALIZADO', dtDesaparecimento: '2023-12-25', dataLocalizacao: '2024-01-05', encontradoVivo: true } },
  { id: 6, nome: 'Juliana Costa', idade: 28, sexo: 'FEMININO', urlFoto: 'https://i.pravatar.cc/150?img=6', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-08-01', dataLocalizacao: null, encontradoVivo: false } },
  { id: 7, nome: 'Ricardo Almeida', idade: 37, sexo: 'MASCULINO', urlFoto: 'https://i.pravatar.cc/150?img=7', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-08-15', dataLocalizacao: null, encontradoVivo: false } },
  { id: 8, nome: 'Fernanda Lima', idade: 22, sexo: 'FEMININO', urlFoto: 'https://i.pravatar.cc/150?img=8', ultimaOcorrencia: { status: 'LOCALIZADO', dtDesaparecimento: '2024-03-03', dataLocalizacao: '2024-03-08', encontradoVivo: true } },
  { id: 9, nome: 'Lucas Barbosa', idade: 30, sexo: 'MASCULINO', urlFoto: 'https://i.pravatar.cc/150?img=9', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-07-28', dataLocalizacao: null, encontradoVivo: false } },
  { id: 10, nome: 'Beatriz Santos', idade: 41, sexo: 'FEMININO', urlFoto: 'https://i.pravatar.cc/150?img=10', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-08-22', dataLocalizacao: null, encontradoVivo: false } },
  { id: 11, nome: 'Marcos Andrade', idade: 50, sexo: 'MASCULINO', urlFoto: 'https://i.pravatar.cc/150?img=11', ultimaOcorrencia: { status: 'LOCALIZADO', dtDesaparecimento: '2024-04-10', dataLocalizacao: '2024-04-20', encontradoVivo: true } },
  { id: 12, nome: 'Patrícia Rocha', idade: 34, sexo: 'FEMININO', urlFoto: 'https://i.pravatar.cc/150?img=12', ultimaOcorrencia: { status: 'DESAPARECIDO', dtDesaparecimento: '2024-08-30', dataLocalizacao: null, encontradoVivo: false } },
];


// A função de mock agora tem a MESMA ASSINATURA da função real
export const getPessoas = async (filtros: FiltrosBusca): Promise<PaginatedResponse<Pessoa>> => {
  console.log("CHAMANDO MOCK API com filtros:", filtros);
  const pagina = filtros.pagina || 0;
  const porPagina = filtros.porPagina || 10;
  
  // Simula o filtro por nome e status (pode ser expandido para outros campos)
  let dadosFiltrados = allMockPessoas.filter(p => {
    const nomeMatch = !filtros.nome || p.nome.toLowerCase().includes(filtros.nome.toLowerCase());
    const statusMatch = !filtros.status || p.ultimaOcorrencia.status === filtros.status;
    return nomeMatch && statusMatch;
  });

  // Simula a paginação
  const inicio = pagina * porPagina;
  const fim = inicio + porPagina;
  const dadosPaginados = dadosFiltrados.slice(inicio, fim);
  
  const resposta: PaginatedResponse<Pessoa> = {
    content: dadosPaginados,
    totalPages: Math.ceil(dadosFiltrados.length / porPagina),
    totalElements: dadosFiltrados.length,
    number: pagina,
    size: porPagina,
  };

  return new Promise(resolve => {
    setTimeout(() => {
      console.log("MOCK API: Retornando dados", resposta);
      resolve(resposta);
    }, 700); // Atraso de 0.7 segundos
  });
};

// Nova função para buscar uma pessoa pelo ID
export const getPersonById = async (id: number): Promise<Pessoa | undefined> => {
  console.log(`CHAMANDO MOCK API: getPersonById com o ID: ${id}`);

  // Encontra a pessoa na nossa lista de mock
  const pessoa = allMockPessoas.find(p => p.id === id);

  return new Promise(resolve => {
    setTimeout(() => {
      console.log("MOCK API: Retornando dados da pessoa", pessoa);
      resolve(pessoa);
    }, 500); // Meio segundo de atraso para simular a rede
  });
};