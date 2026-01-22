import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getSummaryAction } from '../actions/get-summary.action';
import type { SummaryInformationResponse } from '../types/summary-information.response';

export const useHeroSummary =
  (): UseQueryResult<SummaryInformationResponse> => {
    return useQuery({
      queryKey: ['summary-information'],
      queryFn: () => getSummaryAction(),
      staleTime: 1000 * 60 * 2, //! 5 minutos
    });
  };
