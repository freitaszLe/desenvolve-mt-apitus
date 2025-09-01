import { Link } from 'react-router-dom';
import { motion, type Easing } from 'framer-motion';
import { type Pessoa } from '../../services/api';

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut' as Easing,
      duration: 0.3
    }
  }
};

interface CardProps {
  pessoa: Pessoa;
}

const Card = ({ pessoa }: CardProps) => {

  const status = pessoa.ultimaOcorrencia.dataLocalizacao || pessoa.ultimaOcorrencia.encontradoVivo 
    ? 'LOCALIZADO' 
    : 'DESAPARECIDO';

  return (
    <motion.div variants={cardVariants}>
      <Link to={`/pessoa/${pessoa.id}`} className="block group h-full">
        <div className="bg-dark-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center h-full border border-dark-border hover:border-neon-red/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-dark-card/50 to-transparent animate-pulse-slow pointer-events-none opacity-20"></div>

          <img
            className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-dark-border group-hover:border-neon-red/70 transition-colors"
            src={pessoa.urlFoto}
            alt={`Foto de ${pessoa.nome}`}
          />
          <h3 className="text-xl font-semibold text-text-light mb-1 flex-grow">{pessoa.nome}</h3>
          <p className="text-text-muted text-sm">Idade: {pessoa.idade} anos</p>
          <div className="mt-3">
            {status === 'DESAPARECIDO' ? (
              <span className="bg-neon-red text-white text-xs font-bold px-3 py-1 rounded-full drop-shadow-[0_0_5px_rgba(229,0,0,0.6)] animate-pulse">
                Desaparecido
              </span>
            ) : (
              <span className="bg-neon-green text-white text-xs font-bold px-3 py-1 rounded-full drop-shadow-[0_0_5px_rgba(0,204,0,0.6)]">
                Localizado
              </span>
            )}
          </div>
          <p className="mt-4 text-neon-red hover:text-neon-red-dark text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity">
            Ver Detalhes »
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;