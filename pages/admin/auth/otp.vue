<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@@/stores/global'
import { useVerifyOTP } from '@@/queries/auth/admin'
import { useToast } from '#imports'

const otpForm = ref({
  otp: ['', '', '', '', '', ''],
})

const otpString = computed(() => otpForm.value.otp.join(''))
const formIsValid = computed(() => otpForm.value.otp.some(digit => !digit))

const toast = useToast()
const router = useRouter()
const globalStore = useGlobalStore()

const isLoading = ref(false)

const handleSubmit = async () => {
  if (formIsValid.value) {
    toast.add({ description: 'Please enter the complete OTP', color: 'error' })

    return
  }

  isLoading.value = true

  const payload = new FormData()
  payload.append('email', globalStore.email)
  payload.append('otp', otpString.value)

  const { execute, status, data, error } = useVerifyOTP(payload)
  await execute()

  if (status.value === 'success') {
    toast.add({ description: 'OTP verified successfully', color: 'success' })
    router.push('/admin/auth/resetPassword')
  } else {
    toast.add({ description: error.value?.data?.message || 'OTP verification failed', color: 'error' })
  }

  isLoading.value = false

  const route = useRoute()
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
          <p
            class="text-end text-Sequand underline cursor-pointer font-bold"
            @click="navigateTo('/admin/auth/forgetPassword')"
          >
            Resend OTP
          </p>
          <UButton
            type="submit"
            block
            class="w-full sm:mt-3 disabled:bg-primary text-white bg-primary hover:bg-blue-950 rounded-full h-12 py-2.5 font-bold text-center"
            @click="handleSubmit"
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
