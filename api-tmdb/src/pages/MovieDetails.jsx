import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = `https://api.themoviedb.org/3`;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // ... (a lógica de fetch continua a mesma)
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
        if (!response.ok) throw new Error("Falha ao buscar os detalhes do filme.");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-xl mt-12">Carregando detalhes...</p>;
  if (error) return <p className="text-center text-xl text-red-500 mt-12">{error}</p>;
  if (!movie) return <p className="text-center text-xl mt-12">Filme não encontrado.</p>;

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
  const isMovieFavorite = isFavorite(movie.id);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-8">
      <Link to="/" className="text-amber-400 hover:text-amber-300 mb-8 inline-block transition-colors">&larr; Voltar para a busca</Link>
      
      <div className="bg-slate-800 rounded-lg shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
        <img src={posterUrl} alt={`Pôster de ${movie.title}`} className="w-full md:w-1/3 rounded-lg shadow-lg self-center md:self-start" />
        
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
          {movie.tagline && <p className="italic text-slate-400 mt-1">"{movie.tagline}"</p>}
          
          <div className="flex items-center gap-4 text-slate-300 my-4">
            <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
            <span>|</span>
            <span>{new Date(movie.release_date).toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="flex flex-wrap gap-2 my-4">
            {movie.genres.map(genre => <span key={genre.id} className="bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1 rounded-full">{genre.name}</span>)}
          </div>
          
          <h2 className="text-2xl font-semibold text-amber-400 mt-4 mb-2 border-b-2 border-slate-700 pb-1">Sinopse</h2>
          <p className="text-slate-300 leading-relaxed">{movie.overview}</p>

          <button
            onClick={() => isMovieFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
            className={`mt-8 py-3 px-6 font-bold rounded-lg transition-all duration-300 w-full md:w-auto ${
              isMovieFavorite 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-amber-400 hover:bg-amber-500 text-slate-900'
            }`}
          >
            {isMovieFavorite ? 'Remover dos Favoritos ★' : 'Adicionar aos Favoritos ☆'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;