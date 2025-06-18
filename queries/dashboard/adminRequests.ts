import { api, useAPI } from '@@/services/baseApi'

export const useAdminRequests = () => {
    return useAsyncData('adminRequests', () => api(`/government/teams/pending`, {}))
}
export const useApproveAdminRequest = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}/approve`,
    type: 'POST',
    queryKey: 'adminRequests',
    isLazy: true,
  })
}

export const useRejectAdminRequest = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}/reject`,
    type: 'POST',
    queryKey: 'adminRequests',
    isLazy: true,
  })
}
