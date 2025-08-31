import { useEffect, useState, useCallback } from 'react';
import { getPessoas, type Pessoa, type PaginatedResponse, type FiltrosBusca } from '../../services/api.mock';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import SearchForm from '../../components/SearchForm';
import Pagination from '../../components/Pagination';

const HomePage = () => {
  const [resposta, setResposta] = useState<PaginatedResponse<Pessoa> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filtros, setFiltros] = useState<FiltrosBusca>({
    pagina: 0,
    porPagina: 12,
    nome: '',
    status: '',
  });

  // Usamos useCallback para que a função não seja recriada a cada renderização
  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      const novaResposta = await getPessoas(filtros);
      setResposta(novaResposta);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar os dados.");
      setResposta(null); // Limpa dados antigos em caso de erro
    } finally {
      setLoading(false);
    }
  }, [filtros]); // Dependência: a função é recriada se os filtros mudam

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  const handleSearch = (novosFiltros: FiltrosBusca) => {
    setFiltros(filtrosAtuais => ({
      ...filtrosAtuais,
      pagina: 0, 
      nome: novosFiltros.nome,
      status: novosFiltros.status,
    }));
  };

  const handlePageChange = (novaPagina: number) => {
    setFiltros(filtrosAtuais => ({
      ...filtrosAtuais,
      pagina: novaPagina,
    }));
  };

  const pessoas = resposta?.content || [];
  const paginaAtual = resposta?.number || 0;
  const totalPaginas = resposta?.totalPages || 0;

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Consulta de Pessoas</h1>
          <p className="text-slate-400 mt-2">Localize pessoas ou envie novas informações.</p>
        </header>
        
        <SearchForm onSearch={handleSearch} />

        {loading && <div className="text-center mt-20">Carregando...</div>}
        
        {!loading && error && <div className="text-red-500 text-center mt-20">{error}</div>}

        {!loading && !error && (
          <>
            {pessoas.length === 0 ? (
              <div className="text-center mt-20 text-slate-500">Nenhum registro encontrado para os filtros informados.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pessoas.map((pessoa) => (
                  <Card key={pessoa.id} pessoa={pessoa} />
                ))}
              </div>
            )}
            
            <Pagination 
              paginaAtual={paginaAtual}
              totalPaginas={totalPaginas}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;