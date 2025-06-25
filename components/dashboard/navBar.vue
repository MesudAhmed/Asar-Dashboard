<script lang="ts" setup>
const store = useGlobalStore()
const name = ref(store.name)
const email = ref(store.email)

const items = ref([
  {
    label: email.value,
    slot: 'email',
  },
  {
    label: 'Logout',
    icon: 'i-lucide-log-out',
    click: () => {
    },
  },
])
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
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 8,
            }"
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
  </div>
</template>
