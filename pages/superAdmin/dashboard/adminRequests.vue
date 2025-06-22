<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { h, resolveComponent } from 'vue'
import type { Row } from '@tanstack/vue-table'
import { useAdminRequests, useApproveAdminRequest, useRejectAdminRequest } from '@@/queries/dashboard/adminRequests'
import type { teamsResponse } from '~/models/teamsResponseModel'
import { UAvatar } from '#components'
import type { adminRequestsModel } from '~/models/adminRequestsModel'

const openModel = ref(false)
const modalMessage = ref('')
const modalTitle = ref('')
const selectedAdmin = ref<adminRequestsModel | null>(null)
const modalActionType = ref<'approve' | 'reject' | null>(null)

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')

const API_BASE_URL = 'http://volunteer.test-holooltech.com/'

const toast = useToast()

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
    accessorKey: 'full_name',
    header: 'Name',
    cell: ({ row }) => `${row.getValue('full_name')}`,
  },
  {
    accessorKey: 'national_number',
    header: 'National Number',
    cell: ({ row }) => `${row.getValue('national_number')}`,
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
    accessorKey: 'gender',
    header: 'Gender',
    cell: ({ row }) => `${row.getValue('gender')}`,
  },
  {
    accessorKey: 'nationality',
    header: 'Nationality',
    cell: ({ row }) => `${row.getValue('nationality')}`,
  },
  {
    accessorKey: 'birth_date',
    header: 'Birth Date',
    cell: ({ row }) => `${row.getValue('birth_date')}`,
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

function openModal(action: 'approve' | 'reject', admin: adminRequestsModel) {
  selectedAdmin.value = admin
  modalActionType.value = action
  modalTitle.value = `${action === 'approve' ? 'Approve' : 'Reject'} Request for ${admin.full_name}`
  modalMessage.value = `Are you sure you want to ${action === 'approve' ? 'approve' : 'reject'} the request for ${admin.full_name}?`
  openModel.value = true
}
function cancelAction() {
  openModel.value = false
  selectedAdmin.value = null
  modalActionType.value = null
}

async function confirmAction() {
  if (!selectedAdmin.value || !modalActionType.value) {
    return
  }
  const action = modalActionType.value
  let apiResponse
  const adminId = selectedAdmin.value.id
  let successMessage = ''
    if (action === 'approve') {
      successMessage = `Team Approved Successfully ${selectedAdmin.value.full_name}`
      const { execute, clear } = useApproveAdminRequest(adminId)
      refreshAdminRequestsData()
      clear()
      apiResponse = await execute()
    } else {
      successMessage = `Team Rejected Successfully ${selectedAdmin.value.full_name}`
      const { execute, clear } = useRejectAdminRequest(adminId)
      apiResponse = await execute()
      clear()
      refreshAdminRequestsData()
    }
    toast.add({
      title: successMessage,
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
    await refreshNuxtData('adminRequests')
    openModel.value = false
    selectedAdmin.value = null
    modalActionType.value = null
}
function getRowItems(row: Row<adminRequestsModel>) {
  const admin = row.original

  return [
    {
      label: 'Copy Admin ID',
      onSelect() {
        navigator.clipboard.writeText(row.original.id)
        toast.add({
          title: 'Admin-ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      label: 'Approve Request',
       onSelect() {
        openModal('approve', admin)
      },
    },
     {
      label: 'Reject Request',
      onSelect() {
        openModal('reject', admin)
      },
    },
  ]
}

const globalFilter = ref('')
const { data, refresh: refreshAdminRequestsData } = useAdminRequests()
const adminRequests = data.value as teamsResponse
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
            Users
          </h1>
        </div>
        <div class="rounded-lg shadow-xl pb-5">
          <UTable
            ref="table"
            :data="data"
            sticky
            class="flex-1 pt-0 max-h-[500px]"
            :columns="columns"
          />
        </div>
      </div>
    </div>
    <UModal
      v-model:open="openModel"
      :title="modalTitle"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <p>{{ modalMessage }}</p>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="ghost"
            class="bg-gray-500 text-white"
            @click="cancelAction"
          >
            Cancel
          </UButton>
          <UButton
            :class="[modalActionType === 'approve' ? 'bg-green-600 hover:bg-green-800' : 'bg-red-600 hover:bg-red-800']"
            @click="confirmAction"
          >
            Confirm
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<style scoped>
:deep(thead) {
    background-color: #9FBEDD !important;
    box-shadow: 2px 2px black !important;
}
</style>
