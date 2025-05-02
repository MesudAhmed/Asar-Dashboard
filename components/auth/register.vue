<script lang="ts" setup>
import { ref, computed, shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { registerUserSchema } from '~/schema/registerUser.schema'

const props = defineProps({
  registerFunction: {
    type: Function,
    required: true,
  },
})

const userForm = ref({
  firstname: '',
  lastname: '',
  nationalityId: '',
  gender: '',
  birthDate: shallowRef(new CalendarDate(2025, 1, 1)),
  profileImage: null as string | null,
  authorDescription: '',
})

const gender = ref([
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
])

const isFormValid = () => {
  const formattedBirthDate = formatDate(userForm.value.birthDate)
  const result = registerUserSchema.safeParse({
    ...userForm.value,
    birthDate: userForm.value.birthDate,
    dateOfBirth: formattedBirthDate,
  })

  return result.success
}

const formIsValid = computed(() => {
  return !isFormValid()
})

const toast = useToast()
const isLoading = ref(false)
const errorStore = useErrorStore()
const globalStore = useGlobalStore()

function formatDate(calendarDate: CalendarDate | null): string | null {
  if (!calendarDate) {
    return null
  }
  const year = calendarDate.year
  const month = String(calendarDate.month).padStart(2, '0')
  const day = String(calendarDate.day).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const addImageToForm = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) {
    userForm.value.profileImage = null

return
  }
  const reader = new FileReader()
  reader.onload = () => {
    userForm.value.profileImage = reader.result as string
  }
  reader.readAsDataURL(file)
}

const registerUser = async () => {
  isLoading.value = true
  const formattedBirthDate = formatDate(userForm.value.birthDate)
  const payload = {
    ...userForm.value,
    dateOfBirth: formattedBirthDate,
  }
  const result = await props.registerFunction(payload)

  if (result.success) {
    globalStore.role = result.role
    globalStore.token = result.token
    toast.add({ description: 'registered successfully', color: 'success' })
  } else {
    toast.add({ description: `${errorStore.message}`, color: 'error' })
  }

  isLoading.value = false
  userForm.value.firstname = ''
  userForm.value.lastname = ''
  userForm.value.nationalityId = ''
  userForm.value.gender = ''
  userForm.value.profileImage = ''
}
</script>

<template>
  <div
    :class="{ 'w-full md:w-1/2 md:h-auto h-dvh': useRoute().fullPath==='/Auth/user/register' || useRoute().fullPath==='/auth/user/register' }"
  >
    <div class="grid w-full h-full place-items-center">
      <div
        class="flex w-full flex-col items-center justify-center  px-6 mx-auto lg:py-0"
        :class="{ 'md:h-screen': useRoute().fullPath==='/Auth/user' }"
      >
        <slot />
        <div class="w-full md:px-1 lg:px-20">
          <div class="p-0 md:p-0 space-y-4 md:space-y-6 sm:p-8">
            <UForm
              :state="userForm"
              class="space-y-4 md:space-y-6 "
              :schema="registerUserSchema"
              @submit="registerUser"
            >
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <UFormField
                    required
                    label="Full Name"
                    name="firstname"
                  >
                    <UInput
                      v-model="userForm.firstname"
                      class="border-0 rounded-lg bg-white text-black block"
                      size="lg"
                      highlight
                    />
                  </UFormField>
                </div>
                <div>
                  <UFormField
                    required
                    label="nationalityId"
                    name="nationalityId"
                  >
                    <UInput
                      v-model="userForm.nationalityId"
                      class="border-0 rounded-lg bg-white text-black block"
                      size="lg"
                      highlight
                    />
                  </UFormField>
                </div>
                <div>
                  <UFormField
                    required
                    label="lastname"
                    name="lastname"
                  >
                    <UInput
                      v-model="userForm.lastname"
                      class="border-0 rounded-lg bg-white text-black block"
                      size="lg"
                      highlight
                    />
                  </UFormField>
                </div>
                <div>
                  <UFormField
                    required
                    label="Birth Date"
                    name="birthDate"
                  >
                    <UPopover>
                      <UInput
                        block
                        :value="userForm.birthDate"
                        color="primary"
                        class="bg-white hover:bg-white hover:cursor-pointer border-0 rounded-lg text-black block"
                        icon="i-lucide-calendar"
                      />
                      <template #content>
                        <UCalendar
                          v-model="userForm.birthDate"
                          color="primary"
                          class="p-2 bg-white"
                        />
                      </template>
                    </UPopover>
                  </UFormField>
                </div>
                <div>
                  <UFormField
                    label="Image Profile"
                    name="profileImage"
                  >
                    <UInput
                      type="file"
                      class="border-0 rounded-lg bg-white text-black block"
                      size="lg"
                      highlight
                      @change="addImageToForm"
                    />
                  </UFormField>
                </div>
                <div>
                  <URadioGroup
                    v-model="userForm.gender"
                    class="mt-2 cursor-pointer"
                    orientation="horizontal"
                    required
                    color="primary"
                    legend="Gender"
                    name="gender"
                    :items="gender"
                  />
                </div>
              </div>
              <div>
                <UFormField
                  v-if="useRoute().fullPath==='/auth/author'"
                  label="Descrip Your Self"
                  name="pio"
                >
                  <UTextarea
                    v-model="userForm.authorDescription"
                    class="border-0 rounded-lg pb-0 mb-0 bg-white text-black block"
                    size="sm"
                    highlight
                  />
                </UFormField>
              </div>
              <div class="lg:flex md:block sm:text-left text-center justify-between">
                <p class="text-sm underline font-light text-gray-500">
                  Do have an account
                  <slot name="button" />
                </p>
                <UButton
                  :loading="isLoading"
                  :disabled="formIsValid"
                  type="submit"
                  block
                  class="w-full sm:w-44 md:mt-3 mt-3 sm:mt-5 lg:mt-0 disabled:bg-primary text-white bg-primary hover:bg-orange-500 rounded-xl h-10 py-2.5 font-bold text-center"
                >
                  Sign Up
                </UButton>
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
