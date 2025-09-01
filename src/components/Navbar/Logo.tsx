import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group text-text-light">
    <img
        src="/Logo_pjc-.png"
        alt="Brasão da Polícia Judiciária Civil de MT"
        className="h-16 w-auto filter drop-shadow-[0_0_8px_rgba(229,0,0,0.4)]" // Sombra vermelha
    />
    <div className="hidden sm:flex flex-col">
        <span className="font-bold leading-tight group-hover:text-neon-red transition-colors text-xl"> {/* Trocado para neon-red e aumentado */}
        Polícia Judiciária Civil
        </span>
        <p className="text-sm text-text-muted leading-tight"> {/* Ajustado texto secundário */}
        Estado de Mato Grosso
        </p>
    </div>
    </Link>
  );
};