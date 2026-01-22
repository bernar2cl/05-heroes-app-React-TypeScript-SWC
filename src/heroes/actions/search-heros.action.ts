import { heroApi } from '../api/hero.api';
import type { Hero } from '../types/hero.interface';

export interface OptionsSearch {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

export const searchHeroesAction = async (
  options: OptionsSearch,
): Promise<Hero[]> => {
  const { name, team, category, universe, status, strength } = options;
  const params = new URLSearchParams();

  if (name && name.length > 0) params.append('name', name);
  if (team && team.length > 0) params.append('team', team);
  if (category && category.length > 0) params.append('category', category);
  if (universe && universe.length > 0) params.append('universe', universe);
  if (status && status.length > 0) params.append('status', status);
  if (strength && strength.length > 0) params.append('strength', strength);

  const { data } = await heroApi.get<Hero[]>('/search', { params });

  //console.log({ params });

  const hero = data.map((m) => ({
    ...m,
    image: `${BASE_URL}/images/${m.image}`,
  }));

  return hero;
};
