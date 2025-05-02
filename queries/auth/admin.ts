import { useAPI } from '@@/services/baseApi'
import type { UserModel } from '~/models/userModel'

export const useLoginAdmin = (user: UserModel) => {
  return useAPI({ url: '/government/login', payload: user, queryKey: 'user', type: 'POST' })
}
