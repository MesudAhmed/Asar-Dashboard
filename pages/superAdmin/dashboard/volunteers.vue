<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { h } from 'vue'
import { useVolunteers } from '@@/queries/dashboard/volunter'
import type { teamsResponse } from '~/models/teamsResponseModel'
import { UAvatar } from '#components'
import type { adminRequestsModel } from '~/models/adminRequestsModel'

const API_BASE_URL = 'http://volunteer.test-holooltech.com/'
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
          alt: 'Volunter_image',
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
    accessorKey: 'nationality',
    header: 'Nationality',
    cell: ({ row }) => `${row.getValue('nationality')}`,
  },
  {
    accessorKey: 'specialization',
    header: 'Specialization',
    cell: ({ row }) => `${row.getValue('specialization')}`,
  },
  {
    accessorKey: 'total_points',
    header: 'Total Points',
    cell: ({ row }) => `${row.getValue('total_points')}`,
  },
]

const { data: getVolunteers, refresh: refreshGetVolunteers, pending, clear } = useVolunteers()
const Volunteers = computed(() => getVolunteers.value as teamsResponse | undefined)
clear()
</script>

<template>
  <div class="flex bg-[#F5F5F5] flex-col h-screen overflow-hidden">
    <DashboardNavBar />
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
            Volunteers
          </h1>
        </div>
        <div
          v-if="pending"
          class="text-center text-primary text-2xl"
        >
          Loading...
        </div>
        <div
          v-else-if="Volunteers?.data"
          class="rounded-lg shadow-xl pb-5"
        >
          <UTable
            ref="table"
            :data="Volunteers?.data"
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
