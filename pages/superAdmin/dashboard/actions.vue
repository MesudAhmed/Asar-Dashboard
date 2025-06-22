<script lang="ts" setup>
import { useTeamAction } from '@@/queries/dashboard/action'
import type { teamsActionsModel } from '~/models/teamsActionsModel'

const route = useRoute()
const query = route.query as { id: string }
const router = useRouter()

const { data: teamActionData, clear } = useTeamAction(query.id)
clear()
const teamAction = computed(() => teamActionData.value as teamsActionsModel | undefined)
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
            Actions
          </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <div
            class="w-72"
            @click="router.push({ path: '/superAdmin/dashboard/finance', query: { id: query.id } })"
          >
            <UCard
              v-if="teamAction?.data"
              class="shadow-2xl hover:cursor-pointer hover:bg-[#0007660f]"
            >
              <p class="text-lg text-gray-600">
                <UButton class="py-3 px-3">
                  <Icon
                    name="i-lucide-dollar-sign"
                    class="text-white text-xl"
                  />
                </UButton>
                <span class="mx-4 text-2xl">Finance</span>
              </p>
              <div class="flex justify-between py-5 grid-cols-2 gap-4">
                <p class="font-medium pt-1 text-black">
                  Total Price
                </p>
                <p class="text-primary font-bold text-2xl">
                  {{ teamAction.data.total_finance }}
                </p>
              </div>
              <div class="flex justify-between grid-cols-2">
                <p class="tex-lg text-gray-600">
                  campaigns
                </p>
                <p class="text-[#9FBEDD]">
                  {{ teamAction.data.total_campaigns }}
                </p>
              </div>
            </UCard>
            <div
              v-else
              class="shadow-2xl h-52 w-full"
            >
              <USkeleton
                class="h-52 w-full border-2 bg-background rounded"
                :animated="false"
              />
            </div>
          </div>

          <div
            class="w-72"
            @click="router.push({ path: '/superAdmin/dashboard/compaigns', query: { id: query.id } })"
          >
            <UCard
              v-if="teamAction?.data"
              class="shadow-2xl hover:cursor-pointer hover:bg-[#0007660f]"
            >
              <p class="text-lg text-gray-600">
                <UButton class="py-3 px-3">
                  <Icon
                    name="i-lucide-hand-coins"
                    class="text-white text-xl"
                  />
                </UButton>
                <span class="mx-4 text-2xl">Compaigns</span>
              </p>
              <div class="flex justify-center py-5 grid-cols-2 gap-4">
                <p class="font-medium pt-1 text-primary">
                  Compaigns Number
                </p>
              </div>
              <div class="flex justify-between grid-cols-2">
                <p class="tex-lg text-primary text-2xl">
                  {{ teamAction.data.total_campaigns_done }}
                </p>
                <p class="text-[#9FBEDD] font-bold text-2xl">
                  {{ teamAction.data.total_campaigns_rejected }}
                </p>
              </div>
            </UCard>

            <div
              v-else
              class="shadow-2xl h-52 w-full"
            >
              <USkeleton
                class="h-52 w-full border-2 bg-background rounded"
                :animated="false"
              />
            </div>
          </div>

          <div
            class="w-72"
            @click="router.push({ path: '/superAdmin/dashboard/employees', query: { id: query.id } })"
          >
            <UCard
              v-if="teamAction?.data"
              class="shadow-2xl hover:cursor-pointer hover:bg-[#0007660f]"
            >
              <p class="text-lg text-gray-600">
                <UButton class="py-3 px-3">
                  <Icon
                    name="i-lucide-users"
                    class="text-white text-xl"
                  />
                </UButton>
                <span class="mx-4 text-2xl">Employees</span>
              </p>
              <div class="flex justify-center py-5 grid-cols-2 gap-4">
                <p class="font-medium pt-1 text-primary">
                  Employees Number
                </p>
              </div>
              <div class="flex justify-center grid-cols-2">
                <p class="tex-lg text-primary text-2xl">
                  {{ teamAction.data.total_employees }}
                </p>
              </div>
            </UCard>

            <div
              v-else
              class="shadow-2xl h-52 w-full"
            >
              <USkeleton
                class="h-52 w-full border-2 bg-background rounded"
                :animated="false"
              />
            </div>
          </div>
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
