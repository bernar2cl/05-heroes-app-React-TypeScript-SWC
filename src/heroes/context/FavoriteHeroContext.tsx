import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import type { Hero } from '../types/hero.interface';

interface FavoriteHeroContext {
  //State
  favorites: Hero[];
  favoriteCount: number;

  //Methos
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

const getFavoritesFromLocalStorage = () => {
  try {
    const favorites = localStorage.getItem('favorites');
    if (!favorites) return [];

    return JSON.parse(favorites);
  } catch (error) {
    console.error('Error leyendo favoritos desde localStorage: ', error);
    localStorage.removeItem('favorites');
    return [];
  }
};

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(
    getFavoritesFromLocalStorage(),
  );

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.some((h) => h.id === hero.id);
    if (heroExist) {
      const newFavorites = favorites.filter((p) => p.id !== hero.id);
      setFavorites(newFavorites);
      return;
    }
    setFavorites([...favorites, hero]);
  };

  const isFavorite = (hero: Hero) => favorites.some((k) => k.id === hero.id);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoriteHeroContext
      value={{
        //State
        favoriteCount: favorites.length,
        favorites: favorites,

        //Methos
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite,
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
