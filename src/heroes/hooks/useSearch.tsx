import { useQuery } from '@tanstack/react-query';
import {
  searchHeroesAction,
  type OptionsSearch,
} from '../actions/search-heros.action';

export const useSearch = (options: OptionsSearch) => {
  return useQuery({
    queryKey: ['search', options],
    queryFn: () => searchHeroesAction(options),
    staleTime: 1000 * 60 * 5,
    enabled: Object.values(options).some((val) => val && val.length > 0),
  });
};
