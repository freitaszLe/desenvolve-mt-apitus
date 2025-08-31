import { Link } from 'react-router-dom';
// Importamos o "molde" de Pessoa, pode ser do mock ou do api.ts, pois são iguais
import { type Pessoa } from '../../services/api';

interface CardProps {
  pessoa: Pessoa;
}

const Card = ({ pessoa }: CardProps) => {
  // Pegamos o status de dentro da "ultimaOcorrencia" para facilitar o uso
  const status = pessoa.ultimaOcorrencia.status;

  return (
    // AÇÃO 3: Adicionado <Link> para levar à página de detalhes da pessoa
    <Link to={`/pessoa/${pessoa.id}`} className="block group">
      <div 
        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center
                   h-full transition-all duration-300 hover:shadow-xl hover:scale-105"
      >
        <img
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          // AJUSTE 1: Corrigido de 'pessoa.foto' para 'pessoa.urlFoto'
          src={pessoa.urlFoto}
          alt={`Foto de ${pessoa.nome}`}
        />
        <h2 className="text-xl font-bold mt-4 text-gray-800 group-hover:text-blue-600">
          {pessoa.nome}
        </h2>
        <p className="text-gray-600">Idade: {pessoa.idade} anos</p>
        
        {/* Usamos o operador '&&' para só mostrar o status se ele existir */}
        {status && (
          <span className={`mt-4 px-3 py-1 rounded-full text-sm font-semibold ${
            // AJUSTE 2: Corrigido de 'pessoa.status' para a variável 'status'
            status === 'DESAPARECIDO' 
              ? 'bg-red-200 text-red-800' 
              : 'bg-green-200 text-green-800'
          }`}>
            {/* Exibe o status formatado (ex: "Desaparecido") */}
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Card;