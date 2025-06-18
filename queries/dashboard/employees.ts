import { useAPI } from '@@/services/baseApi'

export const useemployees = (id: string | number) => {
  return useAPI({
    url: `/government/teams/${id}/employees`,
    type: 'GET',
    queryKey: 'employees',
    isLazy: true,
  })
}
