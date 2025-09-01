import { Logo } from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-dark-card/90 backdrop-blur-sm sticky top-0 z-10 shadow-lg shadow-black/40 border-b border-dark-border"> {/* ALTERADO AQUI */}
    <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-24">
        <Logo />
        <div></div>
        </div>
    </div>
    </nav>
  );
};

export default Navbar;