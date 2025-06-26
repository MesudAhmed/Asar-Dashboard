import { useAPI } from '@@/services/baseApi'
import type { UserModel } from '~/models/userModel'

export const useLoginUser = (user: UserModel) => {
  return useAPI({ url: '/team/login', payload: user, queryKey: 'user', type: 'POST' })
}

export const useRegisterUser = (user: UserModel) => {
  return useAPI({ url: '/auth/user/register', payload: user, queryKey: 'user', type: 'POST' })
}

export const useLogout = () => {
  return useAPI({ url: '/logout', queryKey: 'logout', type: 'POST' })
}
