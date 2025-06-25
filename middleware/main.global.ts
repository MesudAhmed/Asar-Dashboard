import { useGlobalStore } from '@@/stores/global'
import { RoleName } from '@@/utils/RoleName'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

const superAdminRoutes = ['superAdmin-dashboard', 'superAdmin-dashboard-adminRequests', 'superAdmin-dashboard-volunteers', 'superAdmin-dashboard-actions', 'superAdmin-dashboard-finance', 'superAdmin-dashboard-compaigns', 'superAdmin-dashboard-employees']

export default defineNuxtRouteMiddleware((to, from) => {
  const { role, token } = useGlobalStore()

  if (token && to.name && to.name.toString().startsWith('superAdmin-auth')) {
    return navigateTo({
      path:
        role == RoleName.SuperAdmin
          ? '/superAdmin/dashboard'
          : '/',
    })
  }

  if (token && role === RoleName.SuperAdmin) {
    if (!superAdminRoutes.includes(to.name?.toString() || '')) {
      return navigateTo('/UnauthorizedPage')
    }
  }

 if (!token?.length && to.path !== '/admin/auth' && to.path !== '/superAdmin/auth') {
  return navigateTo({ path: '/admin/auth' })
}

  return true
})
