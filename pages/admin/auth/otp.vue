<script lang="ts" setup>
import { useLoginUser } from '@@/queries/auth/user'
import { loginSchema } from '~/schema/loginUser.schema'

const otpForm = ref({
  otp: ['', '', '', ''],
})
const otpString = computed(() => otpForm.value.otp.join(''))
const formIsValid = computed(() => {
  return otpForm.value.otp.some(digit => !digit)
})

const isLoading = ref(false)
const errorStore = useErrorStore()
const toast = useToast()
const form = ref()
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
            enter your OTP that we Send in your Email
          </p>
        </div>
        <UForm
          ref="form"
          action="#"
          :schema="loginSchema"
          class="space-y-4 text-center"
          @submit.prevent="navigateTo('/admin/auth/forgetPassword')"
        >
          <UPinInput
            v-model="otpForm.otp"
            otp
            color="primary"
            size="xl"
            :length="6"
          />
          <UButton
            type="submit"
            block
            class="w-full sm:mt-3 disabled:bg-primary text-white bg-primary hover:bg-blue-950 rounded-full h-12 py-2.5 font-bold text-center"
            @click="navigateTo('../dashboard')"
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
