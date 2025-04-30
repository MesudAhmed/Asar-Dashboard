<script lang="ts" setup>
import { useLoginUser } from '@@/queries/auth/user'
import { loginSchema } from '~/schema/loginUser.schema'

const userForm = ref({
  email: '',
  password: '',
})

const isLoading = ref(false)
const errorStore = useErrorStore()
const toast = useToast()
const form = ref()

const formIsValid = computed(() => {
  if (!form.value) return true

  return form.value.errors && Object.keys(form.value.errors).length > 0
})
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
          :state="userForm"
          action="#"
          :schema="loginSchema"
          class="space-y-4"
        >
          <UFormField
            class="text-primary"
            label="Email"
            name="email"
          >
            <UInput
              v-model="userForm.email"
              class="border-0 rounded-lg bg-white text-black block"
              size="xl"
              variant="subtle"
            />
          </UFormField>
          <UButton
            :loading="isLoading"
            :disabled="formIsValid"
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
/* You can add custom styles here if needed */
</style>
