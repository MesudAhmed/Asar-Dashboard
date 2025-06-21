import { useAPI } from '@@/services/baseApi'

export const usecompaigns = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}/campaigns`,
    type: 'GET',
    queryKey: 'teamsAction',
    isLazy: true,
  })
}
