import { api, useAPI } from '@@/services/baseApi'

export const useFinance = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/government/teams/${toValue(id)}/total-finance`,
    type: 'GET',
    queryKey: 'finance',
    isLazy: true,
  })
}

export const useTotalFinance = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/government/teams/${toValue(id)}/list-finance`,
    type: 'GET',
    queryKey: 'totalFinance',
    isLazy: true,
  })
}
