  import { useAPI } from '@@/services/baseApi'
  import type { forgetPasswordModel } from '~/models/forgetPasswordModel'
  import type { UserModel } from '~/models/userModel'

  export const useLoginAdmin = (user: UserModel) => {
    return useAPI({ url: '/government/login', payload: user, queryKey: 'admin', type: 'POST' })
  }

  export const useforgetPasswordAdmin = (user: forgetPasswordModel) => {
    return useAPI({ url: '/send-otp', payload: user, queryKey: 'admin', type: 'POST' })
  }

  export const useRegisterAdmin = (user: UserModel | FormData) => {
    return useAPI({
      url: '/team/register',
      payload: user,
      queryKey: 'admin',
      type: 'POST',
    })
  }

  export const useVerifyOTP = (user: UserModel | FormData) => {
    return useAPI({
      url: '/verify-otp',
      payload: user,
      queryKey: 'admin',
      type: 'POST',
    })
  }

  export const useUpdatePassword = (user: UserModel | FormData) => {
    return useAPI({
      url: '/update/Password',
      payload: user,
      queryKey: 'admin',
      type: 'POST',
    })
  }
