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

const { data, refresh: refreshFinance } = useFinance(() => query.id)
const Finance = computed(() => data.value as teamsResponse | undefined)

const { data: totalFinance, refresh: refreshTotalFinance } = useTotalFinance(() => query.id)
const totalFinanceResponse = computed(() => totalFinance.value as FinanceResponse | undefined)

onMounted(() => {
  refreshFinance()
  refreshTotalFinance()
})
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
            Finance
          </h1>
          <UCard class="shadow-xl text-primary">
            {{ totalFinanceResponse?.data[0].total_amount }}
          </UCard>
        </div>
        <div
          v-if="pending"
          class="text-center text-primary text-2xl"
        >
          Loading...
        </div>
        <div
          v-else-if="Finance?.data"
          class="rounded-lg shadow-xl pb-5"
        >
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
