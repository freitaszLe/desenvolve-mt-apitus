import { useState } from 'react';
import type { FiltrosBusca } from '../../services/api.mock';

interface SearchFormProps {
  onSearch: (filtros: FiltrosBusca) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState<'DESAPARECIDO' | 'LOCALIZADO' | ''>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({ nome, status });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Campo de Nome */}
        <div className="flex flex-col">
          <label htmlFor="nome" className="mb-1 text-sm font-semibold text-slate-400">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome..."
            className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Campo de Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="mb-1 text-sm font-semibold text-slate-400">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="DESAPARECIDO">Desaparecido</option>
            <option value="LOCALIZADO">Localizado</option>
          </select>
        </div>

        {/* Botão de Busca */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;