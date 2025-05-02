<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'
import { useTeams } from '@@/queries/dashboard/teams'
import type { teamsResponse } from '~/models/teamsResponseModel'

const items: NavigationMenuItem[] = [{
  label: 'Dashboard',
  icon: 'i-lucide-house',
}, {
  label: 'Teams',
  icon: 'i-lucide-inbox',
  to: '/',
}, {
  label: 'Admin Requests',
  icon: 'i-lucide-users',
}, {
  label: 'Volunteers',
  icon: 'i-lucide-users',
},
]

const { data } = useTeams()
const teams = data.value as teamsResponse
</script>

<template>
  <div class="flex bg-[#F5F5F5] flex-col h-screen overflow-hidden">
    <UDashboardNavbar class="bg-primary  shadow-sm">
      <template #left>
        <div class="flex items-center">
          <span class="text-white font-semibold text-lg">ASAR</span>
        </div>
      </template>
      <template #right>
        <div class="flex items-center gap-4">
          <span class="text-white font-medium">Super Admin</span>
          <UAvatar
            src="https://github.com/benjamincanac.png"
            size="md"
          />
        </div>
      </template>
    </UDashboardNavbar>
    <div class="flex flex-1">
      <UDashboardSidebar
        resizable
        class="bg-primary overflow-y-auto"
        :style="{ width: '250px' }"
      >
        <UNavigationMenu
          :items="items"
          class="text-Sequand"
          orientation="vertical"
          :ui="{
            link: 'hover:text-white text-lg py-4 px-4 transition-colors duration-200',
            list: 'space-y-2',
          }"
        />
      </UDashboardSidebar>
      <div class="flex-1 p-6">
        <div class=" flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Teams
          </h1>
          <UButton class="p-3">
            <Icon
              name="i-lucide-search"
              class="mr-2 text-white"
            />
            <span class="text-white">Search</span>
          </UButton>
        </div>
        <div class="rounded-lg shadow-xl pb-5">
          <UTable
            :data="teams?.data"
            class="flex-1 pt-0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(thead) {
    background-color: #9FBEDD !important;
    box-shadow: 2px 2px black !important;
}
</style>
