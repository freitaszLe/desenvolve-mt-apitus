interface PaginationProps {
  paginaAtual: number;
  totalPaginas: number;
  onPageChange: (novaPagina: number) => void;
}

const Pagination = ({ paginaAtual, totalPaginas, onPageChange }: PaginationProps) => {
  if (totalPaginas <= 1) {
    return null; // Não mostra a paginação se só tiver uma página
  }

  const irParaPaginaAnterior = () => {
    if (paginaAtual > 0) {
      onPageChange(paginaAtual - 1);
    }
  };

  const irParaProximaPagina = () => {
    if (paginaAtual < totalPaginas - 1) {
      onPageChange(paginaAtual + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <button
        onClick={irParaPaginaAnterior}
        disabled={paginaAtual === 0}
        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>

      <span className="text-slate-400">
        Página {paginaAtual + 1} de {totalPaginas}
      </span>

      <button
        onClick={irParaProximaPagina}
        disabled={paginaAtual >= totalPaginas - 1}
        className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;