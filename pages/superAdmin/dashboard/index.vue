<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useTeams } from '@@/queries/dashboard/teams'
import { h, resolveComponent } from 'vue'
import type { Row } from '@tanstack/vue-table'
import type { Team, teamsResponse } from '~/models/teamsResponseModel'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const toast = useToast()
const router = useRouter()
const columns: TableColumn<Team>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `${row.getValue('id')}`,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('name')}`,
  },
  {
    accessorKey: 'team_name',
    header: 'Team Name',
    cell: ({ row }) => `${row.getValue('team_name')}`,
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => `${row.getValue('created_at')}`,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => `${row.getValue('address')}`,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]

function getRowItems(row: Row<Team>) {
  return [
    {
      label: 'Copy Team ID',
      onSelect() {
        navigator.clipboard.writeText(row.original.id)
        toast.add({
          title: 'User-ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      label: 'View Team',
      onSelect() {
        router.push({ path: '/superAdmin/dashboard/actions', query: { id: row.original.id } })
      },
    },
  ]
}

const globalFilter = ref('')

const { data } = useTeams()
const teams = data.value as teamsResponse
</script>

<template>
  <div class="flex bg-[#F5F5F5] flex-col h-screen overflow-hidden">
    <UDashboardNavbar class="bg-primary  shadow-sm">
      <template #left>
        <div class="flex items-center">
          <span class="text-white font-semibold text-xl">ASAR</span>
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
      >
        <DashboardSideBar />
      </UDashboardSidebar>
      <div class="flex-1 p-6">
        <div class=" flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Teams
          </h1>
          <UInput
            v-model="globalFilter"
            class="max-w-sm"
            placeholder="Searsh..."
          />
        </div>
        <div class="rounded-lg shadow-xl pb-5">
          <UTable
            ref="table"
            v-model:global-filter="globalFilter"
            :data="teams?.data"
            sticky
            class="flex-1 pt-0 max-h-[500px]"
            :columns="columns"
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
