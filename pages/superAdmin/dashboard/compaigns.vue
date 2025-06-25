<script lang="ts" setup>
import type { TableColumn, TabsItem } from '@nuxt/ui'
import { usecompaigns } from '@@/queries/dashboard/compaigns'
import { UAvatar } from '#components'
import type { adminRequestsModel } from '~/models/adminRequestsModel'
import type { teamsActionsModel } from '~/models/teamsActionsModel'
import type { teamCampaignsModel } from '~/models/campaignsModel'

const route = useRoute()
const query = route.query as { id: string }

const tabs = ref<TabsItem[]>([
  {
    label: 'Ongoing Campaigns',
    slot: 'Ongoing_Campaigns' as const,
  },
  {
    label: 'Campaigns Implemented',
    slot: 'Campaigns_Implemented' as const,
  },
])

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
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => `${row.getValue('location')}`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => `${row.getValue('status')}`,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => `${row.getValue('date')}`,
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => `${row.getValue('category')}`,
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    cell: ({ row }) => `${row.getValue('cost')}`,
  },
]
const campaignsData = ref<teamsActionsModel | undefined>()

const { data: campaignsDataRaw, refresh: refreshCampaigns, pending } = usecompaigns(() => query.id)
const campaigns = computed(() => campaignsDataRaw.value as teamCampaignsModel | undefined)
onMounted(() => {
  refreshCampaigns()
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
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Compaigns
          </h1>
        </div>
        <UTabs
          :items="tabs"
          class="w-full "
          color="secondary"
          size="xl"
          variant="pill"
        >
          <template #Ongoing_Campaigns>
            <div
              v-if="pending"
              class="text-center text-primary text-2xl"
            >
              Loading...
            </div>
            <div
              v-else-if="campaigns?.data"
              class="rounded-lg shadow-xl pb-5"
            >
              <UTable
                ref="table"
                :data="campaigns?.data.ongoing_campaigns"
                sticky
                class="flex-1 max-h-[500px]"
                :columns="columns"
              />
            </div>
          </template>
          <template #Campaigns_Implemented>
            <h1 class="text-primay">
              <div
                v-if="pending"
                class="text-center text-primary text-2xl"
              >
                Loading...
              </div>
              <div
                v-else-if="campaigns?.data"
                class="rounded-lg shadow-xl pb-5"
              >
                <UTable
                  ref="table"
                  :data="campaigns?.data.completed_campaigns"
                  sticky
                  class="flex-1 max-h-[500px]"
                  :columns="columns"
                />
              </div>
            </h1>
          </template>
        </UTabs>
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
