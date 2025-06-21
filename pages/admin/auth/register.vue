<script lang="ts" setup>
import { useRegisterUser } from '@@/queries/auth/user'
import type { StepperItem } from '@nuxt/ui'
import type { LoginResponse } from '~/models/loginResponseModel'
import type { UserModel } from '~/models/userModel'

const userRegisterFunction = async (userData: UserModel) => {
  const { data, status } = await useRegisterUser(userData)

  if (status.value === 'success') {
    const loginData = data.value as LoginResponse

return { success: true, role: loginData.role, token: loginData.data.token }
  } else {
    return { success: false }
  }
}

const items = ref<StepperItem[]>([
  {
    title: 'User Information',
    icon: 'i-lucide-house',
  },
  {
    title: 'Team Infromation',
    icon: 'i-lucide-truck',
  },
  {
    title: 'Admin Information',
    icon: 'i-lucide-truck',
  },
])
</script>

<template>
  <div class="w-full h-dvh flex flex-col md:flex-row">
    <div class="w-1/2 bg-primary md:grid hidden h-screen place-items-center">
      <img
        src="../../../public/SuperAminLogin.png"
        loading="lazy"
        class="w-full md:w-xl"
      >
    </div>
    <AuthRegister :register-function="userRegisterFunction">
      <div class=" pt-10 sm:pt-0 justify-center pb-8 md:pb-16 gap-0">
        <p class="text-lg md:text-3xl font-bold text-black">
          Team Manager Register
        </p>
      </div>
      <UStepper
        :items="items"
        color="primary"
        class="w-full pb-10"
        :ui="{ icon: 'text-Sequand' }"
      />
      <template #button>
        <NuxtLink
          to="/auth/user"
          class="font-bold cursor-pointer text-primary hover:underline"
        >Sign in</NuxtLink>
      </template>
    </AuthRegister>
  </div>
</template>
