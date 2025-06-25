<script lang="ts" setup>
import { useforgetPasswordAdmin } from '@@/queries/auth/admin'
import { useGlobalStore } from '@@/stores/global'

const forgetPasswordForm = ref({
  email: '',
})
const isLoading = ref(false)
const toast = useToast()
const router = useRouter()

const forgetPasswordAdminFunction = async () => {
  isLoading.value = true
  const { status } = await useforgetPasswordAdmin(forgetPasswordForm.value)
  if (status.value == 'success') {
    toast.add({ description: 'OTP sent successfully', color: 'success' })
    const globalStore = useGlobalStore()
    globalStore.email = forgetPasswordForm.value.email

    await router.push({ 'name': 'admin-auth-otp' })
  }
  else {
    toast.add({ description: 'No account found with this email', color: 'error' })
  }
    isLoading.value = false
}
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-lg md:text-3xl font-bold text-black mt-16">
            Team Manager Login
          </p>
          <p class="text-[#868686] pt-3">
            enter your Email to send OTP
          </p>
        </div>
        <UForm
          ref="form"
          :state="forgetPasswordForm"
          action="#"
          class="space-y-4"
          @submit="forgetPasswordAdminFunction"
        >
          <UFormField
            class="text-primary"
            label="Email"
            name="email"
          >
            <UInput
              v-model="forgetPasswordForm.email"
              class="border-0 rounded-lg bg-white text-black block"
              size="xl"
              variant="subtle"
            />
          </UFormField>
          <UButton
            :loading="isLoading"
            type="submit"
            block
            class="w-full sm:mt-3 disabled:bg-primary text-white bg-primary hover:bg-blue-950 rounded-full h-12 py-2.5 font-bold text-center"
          >
            <span class="font-bold text-lg">Sign in</span>
          </UButton>
        </UForm>
      </div>
    </div>
    <div class="flex-1 bg-primary flex items-center justify-center relative overflow-hidden">
      <img
        src="../../../public/SuperAminLogin.png"
      >
    </div>
  </div>
</template>

<style scoped>

</style>
