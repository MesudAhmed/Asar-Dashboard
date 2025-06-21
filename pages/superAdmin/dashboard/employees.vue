<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'
import { useemployees } from '@@/queries/dashboard/employees'
import type { teamsResponse } from '~/models/teamsResponseModel'
import { UAvatar } from '#components'
import type { adminRequestsModel } from '~/models/adminRequestsModel'

const API_BASE_URL = 'http://volunteer.test-holooltech.com/'
const route = useRoute()
const query = route.query as { id: string }

const columns: TableColumn<adminRequestsModel>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `${row.getValue('id')}`,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const relativeImagePath = row.getValue('image') as string
    const fullImageUrl = `${API_BASE_URL}${relativeImagePath}`

    return h(UAvatar, {
          src: fullImageUrl,
          alt: 'Team_image',
          size: 'md',
          class: 'object-cover',
        })
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('name')}`,
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => `${row.getValue('phone')}`,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => `${row.getValue('email')}`,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => `${row.getValue('address')}`,
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => `${row.getValue('position')}`,
  },
  {
    accessorKey: 'specialization',
    header: 'Specialization',
    cell: ({ row }) => `${row.getValue('specialization')}`,
  },
]
const { data, clear } = useemployees(query.id)
clear()
const employees = computed(() => data.value as teamsResponse | undefined)
</script>

<template>
  <div class="flex bg-[#F5F5F5] flex-col h-screen overflow-hidden">
    <UDashboardNavbar class="bg-primary  shadow-sm">
      <template #left>
        <div class="flex items-center">
          <span class="text-white font-semibold text-xl">Asar</span>
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
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Employees
          </h1>
        </div>
        <div class="rounded-lg shadow-xl pb-5">
          <UTable
            ref="table"
            :data="employees?.data"
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
