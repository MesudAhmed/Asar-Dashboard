import { useGlobalStore } from '@@/stores/global'
import { RoleName } from '@@/utils/RoleName'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

const superAdminRoutes = [
  'superAdmin-dashboard',
  'superAdmin-dashboard-adminRequests',
  'superAdmin-dashboard-volunteers',
  'superAdmin-dashboard-actions',
  'superAdmin-dashboard-finance',
  'superAdmin-dashboard-compaigns',
  'superAdmin-dashboard-employees',
  'UnauthorizedPage',
]

const adminRoutes = [
  'admin-auth',
  'admin-auth-forgetPassword',
  'admin-auth-otp',
  'admin-auth-resetPassword',
  'admin-auth-register',
  'admin-dashboard-employees',
  'admin-dashboard-contracts',
  'admin-dashboard-compaigns',
  'index',
  'UnauthorizedPage',
]

export default defineNuxtRouteMiddleware((to) => {
  const { role, token } = useGlobalStore()
  const toName = to.name?.toString() || ''

  if (!token) {
    if (!toName.startsWith('admin-auth') && !toName.startsWith('superAdmin-auth')) {
      return navigateTo('/admin/auth')
    }

    return
  }

  if (toName.includes('auth')) {
    if (role === RoleName.SuperAdmin && toName.startsWith('superAdmin-auth')) {
      if (to.fullPath !== '/superAdmin/dashboard') {
        return navigateTo('/superAdmin/dashboard')
      }
    } else if (role === RoleName.Admin && toName.startsWith('admin-auth')) {
      if (to.fullPath !== '/') {
        return navigateTo('/')
      }
    }
  }

  if (role === RoleName.SuperAdmin && !superAdminRoutes.includes(toName)) {
    return navigateTo('/UnauthorizedPage')
  }

  if (role === RoleName.Admin && !adminRoutes.includes(toName)) {
    return navigateTo('/UnauthorizedPage')
  }

  return true
})
