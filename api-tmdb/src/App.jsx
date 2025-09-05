// Importações do React e do React Router para gerenciar a navegação.
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Importação das nossas páginas e componentes.
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites'; // Importa a nova página de Favoritos.
import { FavoritesProvider } from './context/FavoritesContext';
import Footer from './components/Footer';

function App() {
  return (
    // O FavoritesProvider "abraça" todo o app, disponibilizando a lista de favoritos para todos.
    <FavoritesProvider>
      {/* Container principal com estilos base do Tailwind. */}
      <div className="bg-slate-900 text-white min-h-screen flex flex-col">
        
        {/* Cabeçalho fixo no topo da página. */}
        <header className="w-full bg-slate-800 shadow-md sticky top-0 z-10">
          <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
            {/* Link para a página inicial com o nome ajustado. */}
            <Link to="/" className="text-2xl font-bold">
              <span className="text-amber-400">Busca Filmes</span>
              <span className="text-blue-500 ml-2">+praTi</span>
            </Link>
            {/* Navegação para outras páginas. */}
            <div>
              <Link to="/favorites" className="text-lg font-semibold text-slate-300 hover:text-amber-400 transition-colors">
                Favoritos
              </Link>
            </div>
          </nav>
        </header>

        {/* Conteúdo principal que cresce para ocupar o espaço disponível. */}
        <main className="flex-grow">
          {/* O React Router decide qual página renderizar com base na URL. */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        
        {/* Rodapé que fica na parte de baixo da página. */}
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;