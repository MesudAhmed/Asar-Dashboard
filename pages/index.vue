<script lang="ts" setup>
import { useCurrentTeamAction, useTeamAction } from '@@/queries/dashboard/action'
import type { currnetTeamsActionsModel } from '~/models/currentTeamAction'

const router = useRouter()
const { data: teamActionData, refresh: refreshTeamAction } = useCurrentTeamAction()
onMounted(() => refreshTeamAction())
const teamAction = computed(() => teamActionData.value as teamsActionsModel | undefined)
</script>

<template>
  <div class="flex bg-[#F5F5F5] flex-col h-screen overflow-hidden">
    <DashboardNavBar />
    <div class="flex flex-1">
      <UDashboardSidebar
        resizable
        class="bg-primary overflow-y-auto"
      >
        <AdminSideBar />
      </UDashboardSidebar>
      <div class="flex-1 p-6">
        <div class=" flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Actions
          </h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          <!-- <div
            class="w-72"
            @click="router.push({ path: '/admin/dashboard/finance' })"
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
                  {{ teamAction.data.finance.total_price }}
                </p>
              </div>
              <div class="flex justify-between grid-cols-2">
                <p class="tex-lg text-gray-600">
                  campaigns
                </p>
                <p class="text-[#9FBEDD]">
                  {{ teamAction.data.campaigns.total_count }}
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
          </div> -->

          <div
            class="w-72"
            @click="router.push({ path: '/admin/dashboard/employees' })"
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
                  {{ teamAction.data.employees.total_count }}
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
            @click="router.push({ path: '/admin/dashboard/contracts' })"
          >
            <UCard
              v-if="teamAction?.data"
              class="shadow-2xl hover:cursor-pointer hover:bg-[#0007660f]"
            >
              <p class="text-lg text-gray-600">
                <UButton class="py-3 px-3">
                  <Icon
                    name="i-lucide-inbox"
                    class="text-white text-xl"
                  />
                </UButton>
                <span class="mx-4 text-2xl">Contracts</span>
              </p>
              <div class="flex justify-center py-5 grid-cols-2 gap-4">
                <p class="font-medium pt-1 text-primary">
                  Contracts Number
                </p>
              </div>
              <div class="flex justify-center grid-cols-2">
                <p class="tex-lg text-primary text-2xl">
                  {{ teamAction.data.contracts.total_count }}
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
            @click="router.push({ path: '/admin/dashboard/compaigns' })"
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
                <p class="text-xl font-medium pt-1 text-primary">
                  {{ teamAction.data.campaigns.total_count }}
                </p>
              </div>
              <div class="flex justify-center grid-cols-2 gap-4">
                <p class="font-medium pt-1 text-primary">
                  Completed {{ teamAction.data.campaigns.completed_percentage }}
                </p>
                <p class="font-medium pt-1 text-primary">
                  UN_Completed {{ teamAction.data.campaigns.uncompleted_percentage }}
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
