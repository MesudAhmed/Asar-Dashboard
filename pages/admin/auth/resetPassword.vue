<script lang="ts" setup>
import { useUpdatePassword } from '@@/queries/auth/admin'
import { useGlobalStore } from '@@/stores/global'

const forgetPasswordForm = ref({
  email: '',
  password: '',
  password_confirmation: '',
})
const toast = useToast()
const router = useRouter()

const pending = ref(false)

const route = useRoute()

const updatePasswordAdminFunction = async () => {
  pending.value = true
  try {
    const { status } = await useUpdatePassword(forgetPasswordForm.value)
    if (status.value === 'success') {
      toast.add({ description: 'New Password sent successfully', color: 'success' })
      const globalStore = useGlobalStore()
      globalStore.email = forgetPasswordForm.value.email
      await router.push({ name: 'admin-auth' })
    } else {
      toast.add({ description: 'Failed to update password', color: 'error' })
    }
  } catch (err) {
    toast.add({ description: 'An error occurred', color: 'error' })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <div class="flex h-screen w-full">
    <div class="flex-1 bg-white flex items-center justify-center">
      <div class="w-full max-w-md px-6 space-y-6">
        <div class="text-center">
          <p class="text-lg md:text-3xl font-bold text-black mt-16">
            Manager Resets Password
          </p>
          <p class="text-[#868686] pt-3">
            enter your New Password
          </p>
        </div>
        <UForm
          ref="form"
          :state="forgetPasswordForm"
          action="#"
          class="space-y-4"
          @submit="updatePasswordAdminFunction"
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
          <UFormField
            class="text-primary"
            label="Password"
            name="password"
          >
            <UInput
              v-model="forgetPasswordForm.password"
              class="border-0 rounded-lg bg-white text-black block"
              size="xl"
              variant="subtle"
            />
          </UFormField>
          <UFormField
            class="text-primary"
            label="Confirmation Password"
            name="passwordConfirmation"
          >
            <UInput
              v-model="forgetPasswordForm.password_confirmation"
              class="border-0 rounded-lg bg-white text-black block"
              size="xl"
              variant="subtle"
            />
          </UFormField>
          <UButton
            :loading="pending"
            :disabled="pending"
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
