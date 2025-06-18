import { api } from '@@/services/baseApi'

export const useVolunteers = () => {
    return useAsyncData('volunteers', () => api(`/government/volunteers`, {}))
}
