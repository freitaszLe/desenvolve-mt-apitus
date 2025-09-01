import { useState } from 'react';
import type { FiltrosBusca } from '../../services/api';

type StatusOption = 'DESAPARECIDO' | 'LOCALIZADO' | '';

interface SearchFormProps {
  onSearch: (filtros: FiltrosBusca) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [nome, setNome] = useState('');
  const [status, setStatus] = useState<StatusOption>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch({ nome, status });
  };

  return (
    <div className="bg-dark-card p-6 rounded-lg shadow-xl mb-8 border border-dark-border">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Campo de Nome */}
        <div className="flex flex-col">
          <label htmlFor="nome" className="mb-1 text-sm font-semibold text-text-muted">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome..."
            className="bg-gray-cyber border border-dark-border rounded-md p-2 text-text-light focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent"
          />
        </div>

        {/* Campo de Status */}
        <div className="flex flex-col">
          <label htmlFor="status" className="mb-1 text-sm font-semibold text-text-muted">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusOption)}
            className="bg-gray-cyber border border-dark-border rounded-md p-2 text-text-light focus:outline-none focus:ring-2 focus:ring-neon-red focus:border-transparent"
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
            className="w-full bg-neon-red hover:bg-neon-red-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-neon-red focus:ring-opacity-75"
          >
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;