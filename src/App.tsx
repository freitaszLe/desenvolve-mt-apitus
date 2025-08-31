import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa as páginas usando lazy loading
const HomePage = lazy(() => import('./pages/Home'));
const DetalhesPage = lazy(() => import('./pages/Detalhes'));

function App() {
  return (
    <BrowserRouter>
      {/* Suspense é necessário para o lazy loading, mostrando um fallback enquanto o componente carrega */}
      <Suspense fallback={<div>Carregando página...</div>}>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<HomePage />} />

          {/* Rota para a página de detalhes de uma pessoa específica */}
          {/* O ":id" é um parâmetro dinâmico que vai mudar (ex: /pessoa/1, /pessoa/2) */}
          <Route path="/pessoa/:id" element={<DetalhesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;