import { useAPI } from '@@/services/baseApi'
import type { forgetPasswordModel } from '~/models/forgetPasswordModel'
import type { UserModel } from '~/models/userModel'

export const useLoginAdmin = (user: UserModel) => {
  return useAPI({ url: '/government/login', payload: user, queryKey: 'user', type: 'POST' })
}

export const useforgetPasswordAdmin = (user: forgetPasswordModel) => {
  return useAPI({ url: '/send-otp', payload: user, queryKey: 'user', type: 'POST' })
}
