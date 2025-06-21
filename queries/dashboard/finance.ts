import { useAPI } from '@@/services/baseApi'

export const useFinance = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}/total-finance`,
    type: 'GET',
    queryKey: 'finance',
    isLazy: true,
  })
}

export const useTotalFinance = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}/list-finance`,
    type: 'GET',
    queryKey: 'totalFinance',
    isLazy: true,
  })
}

export interface FinanceRecord {
  id: number;
  total_amount: string;
  payment: string;
  date: string;
}

export interface FinanceResponse {
  success: boolean;
  data: FinanceRecord[];
}
