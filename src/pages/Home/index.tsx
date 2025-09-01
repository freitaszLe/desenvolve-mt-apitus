import { useEffect, useState, useCallback } from 'react';
import { getPessoas, type Pessoa, type PaginatedResponse, type FiltrosBusca } from '../../services/api.mock';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import HeroSection from '../../components/HeroSection';
import CardSkeleton from '../../components/CardSkeleton';
import { motion } from 'framer-motion';

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

  const carregarDados = useCallback(async () => {
    try {
      setLoading(true);
      const novaResposta = await getPessoas(filtros);
      setResposta(novaResposta);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar os dados.");
      setResposta(null);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

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

  // Definindo as "regras" da animação do contêiner aqui
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // Atraso entre cada card
      }
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <HeroSection onSearch={handleSearch} />
        
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 text-center mt-20">{error}</div>
          ) : (
            <>
              {pessoas.length === 0 ? (
                <div className="text-center mt-20 text-slate-500">Nenhum registro encontrado...</div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {pessoas.map((pessoa) => (
                    <Card key={pessoa.id} pessoa={pessoa} />
                  ))}
                </motion.div>
              )}
              <Pagination 
                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;