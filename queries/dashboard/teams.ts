import { api } from '@@/services/baseApi'

export const useTeams = () => {
    return useAsyncData('teams', () => api(`/government/teams`, {}))
}
