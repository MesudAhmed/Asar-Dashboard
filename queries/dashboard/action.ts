import { useAPI } from '@@/services/baseApi'

export const useTeamAction = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}`,
    type: 'GET',
    queryKey: 'teamsAction',
    isLazy: true,
  })
}

export const useCurrentTeamAction = () => {
  return useAPI({
    url: `/teams/statistics`,
    type: 'GET',
    queryKey: 'currentTeamAction',
    isLazy: true,
  })
}
