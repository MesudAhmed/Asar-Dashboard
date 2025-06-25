import { api, useAPI } from '@@/services/baseApi'

export const useTeamAction = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/government/teams/${toValue(id)}`,
    type: 'GET',
    queryKey: 'teamsAction',
    isLazy: true,
  })
}

export const useCurrentTeamAction = () => {
  return useAsyncData('currentTeamAction', () => api(`/teams/statistics`, {}))
}
