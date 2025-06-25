import { api, useAPI } from '@@/services/baseApi'
import type { teamsResponse } from '~/models/teamsResponseModel'

export const useemployees = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/government/teams/${toValue(id)}/employees`,
    type: 'GET',
    queryKey: 'employees',
    isLazy: true,
  })
}

export const useCurrentTeamEmployees = () => {
  return useAsyncData('currentTeamEmployees', () => api(`/teams/employees`, {}))
}

export const useDeleteEmployes = (id: string | number | (() => string | number)) => {
  return useAPI({
    url: () => `/employees/${toValue(id)}`,
    type: 'DELETE',
    queryKey: 'employees',
    isLazy: true,
  })
}

export const useCreateEmployee = (employee: teamsResponse | FormData) => {
  return useAPI({
    url: '/store/employee',
    payload: employee,
    queryKey: 'employee',
    type: 'POST',
  })
}
