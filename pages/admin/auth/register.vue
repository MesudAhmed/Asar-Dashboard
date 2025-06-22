<script lang="ts" setup>
import { ref, shallowRef, computed } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { useRegisterAdmin } from '@@/queries/auth/admin'
import type { StepperItem } from '@nuxt/ui'
import type { LoginResponse } from '~/models/loginResponseModel'
import type { UserModel } from '~/models/userModel'

const userRegisterFunction = async (userData: UserModel) => {
  const { data, status } = await useRegisterUser(userData)

  if (status.value === 'success') {
    const loginData = data.value as LoginResponse

return { success: true, role: loginData.role, token: loginData.token }
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
  <div class="flex flex-col md:flex-row h-screen w-full">
    <div class="w-1/2 bg-primary md:grid hidden h-screen place-items-center">
      <img
        src="/SuperAminLogin.png"
        class="w-full md:w-xl"
        alt="Illustration"
      >
    </div>

    <div class="w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-16">
      <p class="text-2xl sm:text-3xl font-bold text-black mb-6">
        Team Manager Register
      </p>

      <UStepper
        v-model="activeStep"
        :items="stepItems"
        color="primary"
        class="w-full pb-10"
      />

      <div
        v-if="activeStep === 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl"
      >
        <UFormField
          label="Full Name"
          name="Full_Name"
        >
          <UInput
            v-model="userForm.full_name"
            placeholder="Full Name"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Password"
          name="password"
        >
          <UInput
            v-model="userForm.password"
            type="password"
            placeholder="Password"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="National Number"
          name="National_Number"
        >
          <UInput
            v-model="userForm.national_number"
            placeholder="National Number"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Birth Date"
          name="Birth_Date"
        >
          <UInput
            v-model="userForm.birth_date"
            placeholder="Birth Date (YYYY-MM-DD)"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Image Profile"
          name="profileImage"
        >
          <UInput
            type="file"
            class="border-0 rounded-lg bg-white text-black block"
            size="lg"
            highlight
            @change="(e) => addFileToForm(e, 'image')"
          />
        </UFormField>
        <URadioGroup
          v-model="userForm.gender"
          class="mt-5 cursor-pointer"
          orientation="horizontal"
          required
          color="primary"
          legend="Gender"
          name="gender"
          :items="gender"
        />
      </div>

      <div
        v-else-if="activeStep === 1"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl"
      >
        <UFormField
          label="Team Name"
          name="Team_Name"
        >
          <UInput
            v-model="userForm.team_name"
            placeholder="Team Name"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="License Number"
          name="License_Number"
        >
          <UInput
            v-model="userForm.license_number"
            placeholder="License Number"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Image"
          name="Image"
        >
          <UInput
            type="file"
            class="border-0 rounded-lg bg-white text-black block"
            size="lg"
            highlight
            @change="(e) => addFileToForm(e, 'log_image')"
          />
        </UFormField>
        <UFormField
          label="Logo"
          name="logo"
        >
          <UInput
            type="file"
            class="border-0 rounded-lg bg-white text-black block"
            size="lg"
            highlight
            @change="(e) => addFileToForm(e, 'logo')"
          />
        </UFormField>
      </div>

      <div
        v-else-if="activeStep === 2"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl"
      >
        <UFormField
          label="Phone"
          name="phone"
        >
          <UInput
            v-model="userForm.phone"
            placeholder="Phone"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Email"
          name="email"
        >
          <UInput
            v-model="userForm.email"
            type="email"
            placeholder="Email"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Nationality"
          name="nationality"
        >
          <UInput
            v-model="userForm.nationality"
            placeholder="Nationality"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
        <UFormField
          label="Bank Account Number"
          name="bankAccount"
        >
          <UInput
            v-model="userForm.bank_account_number"
            placeholder="Bank Account Number"
            class="border-0 rounded-lg bg-white text-black block"
            size="xl"
            variant="subtle"
          />
        </UFormField>
      </div>

      <div class="flex justify-between w-full max-w-xl mt-6">
        <UButton
          v-if="activeStep > 0"
          @click="activeStep--"
        >
          Back
        </UButton>
        <div class="text-end w-full">
          <UButton
            v-if="activeStep < 2"
            :disabled="!isStepValid"
            @click="activeStep++"
          >
            Next
          </UButton>
        </div>
      </div>

      <UButton
        v-if="activeStep === 2"
        :loading="isLoading"
        class="px-10 py-3"
        @click="registerUser"
      >
        Sign Up
      </UButton>

      <div class="mt-4 text-sm text-center">
        Do you have an account?
        <NuxtLink
          to="admin/auth"
          class="text-primary font-bold hover:underline"
        >
          Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
