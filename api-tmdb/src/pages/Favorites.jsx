// Importações necessárias: React, o hook 'useContext', Link para navegação, nosso Contexto e o MovieCard.
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  // Usamos o hook 'useContext' para acessar a lista de 'favorites' do nosso 'quadro de avisos' global.
  const { favorites } = useContext(FavoritesContext);

  return (
    // Container principal da página de favoritos.
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-amber-400">
        Meus Filmes Favoritos
      </h1>

      {/* Renderização Condicional: Verificamos se há filmes na lista de favoritos. */}
      {favorites.length > 0 ? (
        // Se a lista NÃO estiver vazia, renderizamos o grid de filmes.
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Usamos .map() para percorrer a lista de favoritos e criar um MovieCard para cada filme. */}
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        // Se a lista ESTIVER vazia, renderizamos uma mensagem amigável para o usuário.
        <div className="text-center text-slate-400 mt-12">
          <p className="text-2xl mb-4">Sua lista de favoritos está vazia.</p>
          <p>Adicione filmes clicando no botão "Adicionar aos Favoritos" na página de detalhes de um filme.</p>
          {/* Botão que leva o usuário de volta para a página de busca. */}
          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Buscar Filmes
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;