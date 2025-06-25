<script lang="ts" setup>
import { useLoginUser } from '@@/queries/auth/user'
import type { LoginResponse } from '~/models/loginResponseModel'
import type { UserModel } from '~/models/userModel'

const router = useRouter()

const userLoginFunction = async (userData: UserModel) => {
  const { data, status } = await useLoginUser(userData)
  if (status.value === 'success') {
    const loginData = data.value as LoginResponse
    router.push('/')

    return { success: true, role: 'Admin', token: loginData.data.token, name: loginData.data.team.full_name, email: loginData.data.team.email }
  } else {
    return { success: false }
  }
}

const route = useRoute()
</script>

<template>
  <div class="w-full h-dvh flex flex-col md:flex-row">
    <Auth :login-function="userLoginFunction">
      <p class="text-lg md:text-3xl font-bold text-black mt-16">
        Team Manager Login
      </p>
      <p class="text-[#868686] pt-3">
        Enter your Email and Password
      </p>
      <template #button>
        <NuxtLink class="font-bold cursor-pointer text-primary hover:underline">
          Sign in
        </NuxtLink>
      </template>
    </Auth>
    <div class="w-1/2 bg-primary md:grid hidden h-screen place-items-center">
      <img
        src="../../../public/SuperAminLogin.png"
        loading="lazy"
        class="w-full md:w-xl"
      >
    </div>
  </div>
</template>
