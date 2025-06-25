import { api, useAPI } from '@@/services/baseApi'

export const usecompaigns = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/government/teams/${toValue(id)}/campaigns`,
    type: 'GET',
    queryKey: 'compaigns',
    isLazy: true,
  })
}

export const useCurrentContracts = () => {
  return useAsyncData('currentTeamCompaigns', () => api(`/teams/campaigns`, {}))
}
