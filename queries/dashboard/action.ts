import { useAPI } from '@@/services/baseApi'

export const useTeamAction = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}`,
    type: 'GET',
    queryKey: 'teamsAction',
    isLazy: true,
  })
}
