import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  // Constrói a URL do pôster, com uma imagem reserva caso não exista.
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';

  // Pega o ano da data de lançamento.
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    // O Link agora envolve todo o card, tornando-o clicável.
    <Link to={`/movie/${movie.id}`}>
      {/* Tradução Tailwind:
        - group: Permite efeitos :hover no pai afetarem os filhos.
        - bg-slate-800: Cor de fundo.
        - rounded-lg: Cantos arredondados.
        - overflow-hidden: Garante que a imagem não "vaze" dos cantos arredondados.
        - shadow-lg: Sombra sutil.
        - hover:-translate-y-1 hover:shadow-2xl: Efeito de levantar e aumentar a sombra ao passar o mouse.
        - transition-all duration-300: Animação suave para todos os efeitos.
        - flex flex-col: Define o layout como uma coluna flexível.
      */}
      <div className="group bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
        <img 
          src={posterUrl} 
          alt={`Pôster de ${movie.title}`} 
          className="w-full h-auto object-cover aspect-[2/3]" // Mantém a proporção 2:3 dos pôsteres.
        />
        {/* Tradução Tailwind:
          - p-4: Padding (espaçamento interno).
          - flex-grow: Faz esta div crescer e ocupar o espaço restante.
          - flex flex-col justify-between: Alinha o conteúdo verticalmente.
        */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-lg font-bold text-amber-400 group-hover:text-amber-300 transition-colors duration-300">
              {movie.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;