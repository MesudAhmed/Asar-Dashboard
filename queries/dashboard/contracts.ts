import { api, useAPI } from '@@/services/baseApi'
import type { teamsResponse } from '~/models/teamsResponseModel'

export const useCurrentContracts = () => {
  return useAsyncData('CurrentContracts', () => api(`/teams/contracts`, {}))
}

export const useDeleteCurrentContracts = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/teams/contracts/${toValue(id)}`,
    type: 'DELETE',
    queryKey: 'CurrentContracts',
    isLazy: true,
  })
}

export const useCreateCurrentContracts = (employee: teamsResponse | FormData) => {
  return useAPI({
    url: '/teams/contracts',
    payload: employee,
    queryKey: 'CurrentContracts',
    type: 'POST',
  })
}
