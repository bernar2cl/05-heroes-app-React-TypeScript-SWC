import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';
import type { HeroesResponse } from '../types/get-heroes.response';

export const usePaginatedHero = (
  page: number,
  limit: number,
  category: string = 'all',
): UseQueryResult<HeroesResponse> => {
  return useQuery({
    //queryKey: ['heroes', 'page', page],
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
