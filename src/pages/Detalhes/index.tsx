import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPersonById, type Pessoa } from '../../services/api'; 
import Navbar from '../../components/Navbar';
import SubmissionForm, { type SubmissionFormData } from '../../components/SubmissionForm';

const DetalhesPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [informacoesAdicionais, setInformacoesAdicionais] = useState<SubmissionFormData[]>([]);

  useEffect(() => {
    if (!id) {
      setError("ID da pessoa não fornecido.");
      setLoading(false);
      return;
    }

    const carregarDadosDaPessoa = async () => {
      try {
        setLoading(true);
        const pessoaId = parseInt(id, 10);
        const dados = await getPersonById(pessoaId);
        if (dados) {
          setPessoa(dados);
        } else {
          setError("Pessoa não encontrada.");
        }
      } catch (err) {
        setError("Falha ao carregar os dados da pessoa.");
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDaPessoa();
  }, [id]);

  const handleSaveInfo = (novaInfo: SubmissionFormData) => {
    setInformacoesAdicionais(infosAtuais => [...infosAtuais, novaInfo]);
  };

  if (loading) {
    return (
        <>
          <Navbar />
          <div className="text-center mt-20">Carregando detalhes...</div>
        </>
    )
  }

  if (error || !pessoa) {
    return (
      <>
        <Navbar />
        <div className="text-red-500 text-center mt-20">
          <p>{error || "Ocorreu um erro inesperado."}</p>
          <button onClick={() => navigate('/')} className="mt-4 text-blue-400 hover:text-blue-300">
            Voltar para a busca
          </button>
        </div>
      </>
    );
  }
  
  const status = pessoa.ultimaOcorrencia.dataLocalizacao || pessoa.ultimaOcorrencia.encontradoVivo ? 'LOCALIZADO' : 'DESAPARECIDO';

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-light mb-8 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Voltar para a Lista
        </button>

        <div className="bg-dark-card border border-dark-border rounded-lg shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna da Foto */}
          <div className="md:col-span-1 flex justify-center">
            <img 
              src={pessoa.urlFoto} 
              alt={`Foto de ${pessoa.nome}`} 
              className="w-full max-w-sm rounded-lg object-cover border-4 border-dark-border"
            />
          </div>

          {/* Coluna das Informações */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h1 className="text-4xl font-bold text-white">{pessoa.nome}</h1>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap ${
                status === 'DESAPARECIDO' 
                  ? 'bg-neon-red text-white drop-shadow-[0_0_5px_rgba(229,0,0,0.6)] animate-pulse' 
                  : 'bg-neon-green text-white drop-shadow-[0_0_5px_rgba(0,204,0,0.6)]'
              }`}>
                {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
              </span>
            </div>

            <div className="border-b border-dark-border my-6"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
              <div>
                <p className="text-text-muted text-sm font-semibold">IDADE</p>
                <p className="text-text-light">{pessoa.idade} anos</p>
              </div>
              <div>
                <p className="text-text-muted text-sm font-semibold">SEXO</p>
                <p className="text-text-light">{pessoa.sexo ? pessoa.sexo.charAt(0).toUpperCase() + pessoa.sexo.slice(1).toLowerCase() : 'Não informado'}</p>
              </div>
              <div>
                <p className="text-text-muted text-sm font-semibold">DATA DO DESAPARECIMENTO</p>
                <p className="text-text-light">{new Date(pessoa.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString()}</p>
              </div>
              {status === 'LOCALIZADO' && pessoa.ultimaOcorrencia.dataLocalizacao && (
                <div>
                  <p className="text-text-muted text-sm font-semibold">DATA DA LOCALIZAÇÃO</p>
                  <p className="text-text-light">{new Date(pessoa.ultimaOcorrencia.dataLocalizacao).toLocaleDateString()}</p>
                </div>
              )}
            </div>
            
            <div className="flex-grow"></div>

            <div className="border-b border-dark-border my-6"></div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300"
            >
              Registrar Nova Informação
            </button>
          </div>
        </div>
        
        {informacoesAdicionais.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-4">Informações Adicionais Recebidas</h2>
            <div className="space-y-4">
              {informacoesAdicionais.map((info, index) => (
                <div key={index} className="bg-dark-card border border-dark-border rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start">
                  {info.fotoUrl && (
                    <img src={info.fotoUrl} alt="Informação enviada" className="w-28 h-28 rounded-md object-cover border border-dark-border" />
                  )}
                  <div className="flex-1">
                    <p className="text-text-muted"><strong className="text-text-light">Visto em:</strong> {info.dataAvistamento} | <strong className="text-text-light">Local:</strong> {info.localizacao}</p>
                    <p className="text-text-light mt-2 italic">"{info.observacoes}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <SubmissionForm 
          personName={pessoa.nome} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveInfo}
        />
      )}
    </>
  );
};

export default DetalhesPage;