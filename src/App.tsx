import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Suas páginas importadas com lazy loading
const HomePage = lazy(() => import('./pages/Home'));
const DetalhesPage = lazy(() => import('./pages/Detalhes'));

const AppRoutes = () => {
  const location = useLocation(); // Pega a localização atual para a animação

  return (
    // O AnimatePresence "observa" as mudanças de rota
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Carregando...</div>}>
        {/* O 'key' é crucial para o AnimatePresence saber que a página mudou */}
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pessoa/:id" element={<DetalhesPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;