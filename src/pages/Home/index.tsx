import { getPessoas, type Pessoa, type PaginatedResponse, type FiltrosBusca } from '../../services/api.mock';
import Card from '../../components/Card';
import Navbar from '../../components/Navbar';
import Pagination from '../../components/Pagination';
import HeroSection from '../../components/HeroSection';
import CardSkeleton from '../../components/CardSkeleton';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { options } from '../../config/particles-config';
import AnimatedPage from '../../components/AnimatedPage';

const TAMANHO_DA_PAGINA = 12;

const HomePage = () => {

  const [init, setInit] = useState(false);
  const [pessoasExibidas, setPessoasExibidas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [filtros, setFiltros] = useState<FiltrosBusca>({
    nome: '',
    status: '',
  });

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine); 
    }).then(() => {
      setInit(true);
    });
  }, []);

  const carregarDados = useCallback(async (paginaParaBuscar: number) => {
    try {
      setLoading(true);
      
      let pessoasColetadas: Pessoa[] = [];
      let paginaApi = paginaParaBuscar;
      let totalPaginasApi = 0;

      while (pessoasColetadas.length < TAMANHO_DA_PAGINA) {
        const respostaApi = await getPessoas({ ...filtros, pagina: paginaApi, porPagina: TAMANHO_DA_PAGINA });
        
        if (!respostaApi || respostaApi.content.length === 0) {
          totalPaginasApi = paginaApi; 
          break;
        }

        totalPaginasApi = respostaApi.totalPages;
        const dadosBrutos = respostaApi.content;
        
        const dadosFiltrados = dadosBrutos.filter(pessoa => {
          const statusReal = pessoa.ultimaOcorrencia.dataLocalizacao || pessoa.ultimaOcorrencia.encontradoVivo 
            ? 'LOCALIZADO' 
            : 'DESAPARECIDO';
          
          const statusMatch = !filtros.status || statusReal === filtros.status;
          const nomeMatch = !filtros.nome || pessoa.nome.toLowerCase().includes(filtros.nome.toLowerCase());

          return statusMatch && nomeMatch;
        });

        pessoasColetadas.push(...dadosFiltrados);
        
        if (paginaApi >= totalPaginasApi - 1) {
          break;
        }
        
        paginaApi++; 
      }
      
      setPessoasExibidas(pessoasColetadas.slice(0, TAMANHO_DA_PAGINA)); 
      setError(null);

    } catch (err) {
      setError("Falha ao carregar os dados. A API pode estar indisponível.");
      setPessoasExibidas([]);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {

    carregarDados(paginaAtual);
  }, [carregarDados, paginaAtual]);


  const handleSearch = (novosFiltros: FiltrosBusca) => {
    setPaginaAtual(0); 
    setFiltros({
      nome: novosFiltros.nome,
      status: novosFiltros.status,
    });
  };
  
  const handlePageChange = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

    // Só renderiza a página quando as partículas estiverem prontas
  if (!init) {
    return null;
  }

  return (
    
    <div className="relative min-h-screen">
        <Particles
          id="tsparticles"
          options={options}
        />
      <Navbar />
      <AnimatedPage>
      <main className="container mx-auto p-4 md:p-8 relative z-0">
        <HeroSection onSearch={handleSearch} />
        
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: TAMANHO_DA_PAGINA }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500 text-center mt-20">{error}</div>
          ) : (
            <>
              {pessoasExibidas.length === 0 ? (
                <div className="text-center mt-20 text-slate-500">Nenhum registro encontrado para os filtros informados.</div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {pessoasExibidas.map((pessoa) => (
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
      </AnimatedPage>
    </div>
  );
};

export default HomePage;