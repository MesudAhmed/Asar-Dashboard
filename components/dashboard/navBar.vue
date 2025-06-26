<script lang="ts" setup>
import { ref } from 'vue'
import { useGlobalStore } from '@@/stores/global'
import { useLogout } from '@@/queries/auth/user'

const store = useGlobalStore()
const name = ref(store.name)
const email = ref(store.email)

const showLogoutConfirm = ref(false)

const confirmLogout = async () => {
const { execute, status } = useLogout()

  await execute()

  if (status.value === 'success') {
    store.logout()
    showLogoutConfirm.value = false
  }
}

const items = [
  {
    label: email.value,
    isDisabled: true,
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    onSelect: () => {
      console.log('Logout dialog opened')
      showLogoutConfirm.value = true
    },
  },
]
</script>

<template>
  <div>
    <UDashboardNavbar class="bg-primary shadow-sm">
      <template #left>
        <div class="flex items-center">
          <span class="text-white font-semibold text-xl">ASAR</span>
        </div>
      </template>

      <template #right>
        <span class="text-white">{{ name }}</span>
        <div class="flex items-center gap-4">
          <UDropdownMenu
            :items="items"
            :content="{ align: 'center', side: 'bottom', sideOffset: 8 }"
            :ui="{
              item: 'cursor-pointer px-3 py-2 hover:bg-gray-100 hover:text-red-500 rounded text-sm',
              content: 'w-48 text-center',
            }"
          >
            <UButton variant="ghost">
              <UAvatar
                label="open"
                src="https://github.com/benjamincanac.png"
                size="md"
              />
            </UButton>
          </UDropdownMenu>
        </div>
      </template>
    </UDashboardNavbar>

    <UModal
      v-model:open="showLogoutConfirm"
      title="Logout Confirmation"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <p>Are you sure you want to log out?</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton variant="ghost" @click="showLogoutConfirm = false">
            Cancel
          </UButton>
          <UButton color="error" @click="confirmLogout">
            Logout
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>
