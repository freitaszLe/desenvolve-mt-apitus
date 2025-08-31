import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group text-white">
        <img
        src="/Logo_pjc-.png"
        alt="Brasão da Polícia Judiciária Civil de MT"
        className="h-16 w-auto" // ALTERE AQUI de h-12 para h-16
        />
      {/* Este div só aparecerá em telas pequenas ou maiores (sm:) */}
      <div className="hidden sm:flex flex-col">
        <span className="font-bold leading-tight group-hover:text-blue-400 transition-colors">
          Polícia Judiciária Civil
        </span>
        <p className="text-xs text-slate-400 leading-tight">
          Estado de Mato Grosso
        </p>
      </div>
    </Link>
  );
};