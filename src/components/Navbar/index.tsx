import { Logo } from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-slate-800/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24"> {/* Aumentei a altura */}
          <Logo />

          {/* Espaço para futuros links ou botões */}
          <div></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;