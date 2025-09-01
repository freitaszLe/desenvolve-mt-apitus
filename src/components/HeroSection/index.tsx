import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchForm from '../SearchForm';
import type { FiltrosBusca } from '../../services/api';

interface HeroSectionProps {
  onSearch: (filtros: FiltrosBusca) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const backgroundImageUrl = 'https://images.unsplash.com/photo-1550745165-9bc0b252726a?auto=format&fit=crop&q=80&w=2070';
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div 
      className="relative rounded-lg overflow-hidden mb-10 shadow-2xl border border-dark-border"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-dark-bg opacity-80"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-8 text-center"> 
        <h1 className="text-4xl md:text-5xl font-bold text-neon-red drop-shadow-[0_0_8px_rgba(229,0,0,0.7)]">
          SISTEMA DE BUSCA
        </h1>
        <p className="text-text-muted mt-2 text-lg">
          Polícia Judiciária Civil - Divisão de Pessoas Desaparecidas
        </p>

        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="mt-6 inline-flex items-center gap-2 bg-dark-card hover:bg-gray-cyber border border-dark-border hover:border-neon-red px-6 py-2 rounded-lg text-text-light font-semibold transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-5 h-5 transition-transform duration-300 ${isSearchOpen ? 'rotate-180' : ''}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
          {isSearchOpen ? 'Fechar Filtros' : 'Abrir Filtros de Busca'}
        </button>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              key="search-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="mt-8 max-w-3xl mx-auto overflow-hidden"
            >
              <SearchForm onSearch={onSearch} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;