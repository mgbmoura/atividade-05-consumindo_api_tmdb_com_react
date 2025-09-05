import React, { createContext, useState, useEffect } from 'react';

// 1. Criando o Contexto (o quadro de avisos em si)
export const FavoritesContext = createContext();

// 2. Criando o Provedor (quem gerencia e publica os avisos)
export const FavoritesProvider = ({ children }) => {
  // O estado que vai guardar a lista de filmes favoritos
  const [favorites, setFavorites] = useState(() => {
    // Função para carregar os favoritos do localStorage ao iniciar
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // useEffect para SALVAR no localStorage sempre que a lista 'favorites' mudar
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Função para adicionar um filme
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  // Função para remover um filme
  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieId));
  };

  // Verificamos se um filme já é favorito
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // O "value" é o que será publicado no nosso quadro de avisos.
  // Qualquer componente "filho" poderá acessar essas informações.
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};