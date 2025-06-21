<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { useFinance, useTotalFinance, type FinanceResponse } from '@@/queries/dashboard/finance'
import type { teamsResponse } from '~/models/teamsResponseModel'
import { UAvatar } from '#components'
import type { adminRequestsModel } from '~/models/adminRequestsModel'

const route = useRoute()
const query = route.query as { id: string }

const columns: TableColumn<adminRequestsModel>[] = [
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
    accessorKey: 'details',
    header: 'Details',
    cell: ({ row }) => `${row.getValue('details')}`,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => `${row.getValue('date')}`,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => `${row.getValue('cost')}`,
  },
]

const { data } = useFinance(query.id)
const Finance = data.value as teamsResponse

const { data: totalFinance } = useTotalFinance(query.id)
const totalFinanceResponse = totalFinance.value as FinanceResponse
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
            Finance
          </h1>
          <UCard class="shadow-xl text-primary">
            {{ totalFinanceResponse?.data[0].total_amount }}
          </UCard>
        </div>
        <div class="rounded-lg shadow-xl pb-5">
          <UTable
            ref="table"
            :data="Finance?.data"
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
