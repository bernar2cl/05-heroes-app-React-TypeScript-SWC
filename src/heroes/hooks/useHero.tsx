import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getHeroAction } from '../actions/get-hero.action';
import type { Hero } from '../types/hero.interface';

export const useHero = (idSlug: string): UseQueryResult<Hero> => {
  return useQuery({
    queryKey: ['heroes', idSlug],
    queryFn: () => getHeroAction(idSlug),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
