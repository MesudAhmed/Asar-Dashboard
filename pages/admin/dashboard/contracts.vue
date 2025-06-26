<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { h, ref, computed, onMounted } from 'vue'
import { useCurrentContracts, useDeleteCurrentContracts, useCreateCurrentContracts } from '@@/queries/dashboard/contracts'
import type { Row } from '@tanstack/vue-table'
import { useRoute } from '#app'
import { useToast } from '#imports'
import type { teamsResponse } from '~/models/teamsResponseModel'
import { UAvatar, UDropdownMenu, UButton, UModal, USelect } from '#components'
import type { adminRequestsModel } from '~/models/adminRequestsModel'

const API_BASE_URL = 'http://volunteer.test-holooltech.com/'
const route = useRoute()
const toast = useToast()

const deleteModalOpen = ref(false)
const modalMessage = ref('')
const modalTitle = ref('')
const selectedContracts = ref<adminRequestsModel | null>(null)

const { data, refresh: vrefreshContracts, pending } = useCurrentContracts()

onMounted(() => {
  vrefreshContracts()
})

const contracts = computed(() => data.value as teamsResponse | undefined)

function openDeleteModal(contracts: adminRequestsModel) {
  selectedContracts.value = contracts
  modalTitle.value = `Delete ${contracts.company_name}`
  modalMessage.value = `Are you sure you want to delete ${contracts.content}?`
  deleteModalOpen.value = true
}

function cancelDelete() {
  selectedContracts.value = null
  deleteModalOpen.value = false
}

const isDeleting = ref(false)

async function confirmDelete() {
  if (!selectedContracts.value) return

  const { execute } = useDeleteCurrentContracts(selectedContracts.value.id)
  isDeleting.value = true

  try {
    await execute()
    toast.add({
      title: `${selectedContracts.value.content} It was successfully deleted`,
      color: 'error',
      icon: 'i-lucide-trash-2',
    })
    vrefreshContracts()
    deleteModalOpen.value = false
    selectedContracts.value = null
  } catch (err) {
    toast.add({
      title: `Failed to delete ${selectedContracts.value.content}`,
      description: err?.data?.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    })
  } finally {
    isDeleting.value = false
  }
}

function getRowItems(row: Row<adminRequestsModel>) {
  const admin = row.original

  return [
    {
      label: 'Copy ID',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(admin.id)
        toast.add({
          title: 'ID copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-check',
        })
      },
    },
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      onSelect() {
        openDeleteModal(admin)
      },
    },
  ]
}

const columns: TableColumn<adminRequestsModel>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => `${row.getValue('id')}`,
  },
  {
    accessorKey: 'company_name',
    header: 'Company Name',
    cell: ({ row }) => `${row.getValue('company_name')}`,
  },
  {
    accessorKey: 'content',
    header: 'Content',
    cell: ({ row }) => `${row.getValue('content')}`,
  },
  {
    accessorKey: 'contract_date',
    header: 'Contract Date',
    cell: ({ row }) => `${row.getValue('contract_date')}`,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      const relativeImagePath = row.getValue('image') as string
      const fullImageUrl = `${API_BASE_URL}${relativeImagePath}`

      return h(UAvatar, {
        src: fullImageUrl,
        alt: 'content_image',
        size: 'md',
        class: 'object-cover',
      })
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) =>
      h(
        UDropdownMenu,
        {
          items: getRowItems(row),
          'aria-label': 'Actions',
        },
        {
          default: () =>
            h(UButton, {
              icon: 'i-lucide-more-vertical',
              color: 'gray',
              variant: 'ghost',
              'aria-label': 'Actions',
            }),
        },
      ),
  },
]

const createModalOpen = ref(false)
const newContracts = ref({
  company_name: '',
  content: '',
  national_number: '',
  position: '',
  phone: '',
  address: '',
  contract_date: '2000-01-01',
  image: null,
  specialization_id: '',
})

const isCreating = ref(false)

async function submitnewContracts() {
  const formData = new FormData()

  Object.entries(newContracts.value).forEach(([key, val]) => {
    if (key === 'image' && val instanceof File) {
      formData.append('image', val)
    } else {
      formData.append(key, String(val))
    }
  })

  const { execute } = useCreateCurrentContracts(formData)
  isCreating.value = true

  try {
    await execute()
    toast.add({
      title: 'Employee contract successfully',
      color: 'green',
      icon: 'i-lucide-check-circle',
    })
    vrefreshContracts()
    createModalOpen.value = false
    newContracts.value = {
      company_name: '',
      content: '',
      contract_date: '',
      contract_date: '2000-01-01',
      image: null,
    }
  } catch (err) {
    toast.add({
      title: 'Failed to create contract',
      description: err?.data?.message,
      color: 'red',
      icon: 'i-lucide-alert-triangle',
    })
  } finally {
    isCreating.value = false
  }
}
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
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl text-primary font-bold pb-2">
            Contracts
          </h1>
          <UButton
            class="bg-primary hover:bg-blue-950 text-white"
            @click="createModalOpen = true"
          >
            + Add Contracts
          </UButton>
        </div>

        <div
          v-if="pending"
          class="text-center text-primary text-2xl"
        >
          <ULoader
            size="lg"
            color="primary"
          />
        </div>

        <div
          v-else-if="contracts?.data"
          class="rounded-lg shadow-xl pb-5"
        >
          <UTable
            ref="table"
            :data="contracts?.data"
            sticky
            class="flex-1 pt-0 max-h-[500px]"
            :columns="columns"
          />
        </div>
      </div>
    </div>

    <UModal
      v-model:open="deleteModalOpen"
      :title="modalTitle"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <p>{{ modalMessage }}</p>
      </template>
      <template #footer>
        <UButton
          class="bg-red-600 hover:bg-red-800 text-white"
          :loading="isDeleting"
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          Delete
        </UButton>
      </template>
    </UModal>

    <UModal
      v-model:open="createModalOpen"
      title="Add New Contracts"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <UInput
            v-model="newContracts.company_name"
            placeholder="Company Name"
          />
          <UInput
            v-model="newContracts.content"
            placeholder="Content"
          />
          <UInput
            v-model="newContracts.contract_date"
            placeholder="(YYYY-MM-DD)"
            type="date"
          />
          <UInput
            type="file"
            @change="e => newContracts.image = e.target.files[0]"
          />
        </div>
      </template>
      <template #footer>
        <UButton
          color="gray"
          variant="ghost"
          class="bg-gray-500 text-white"
          @click="createModalOpen = false"
        >
          Cancel
        </UButton>
        <UButton
          class="bg-primary hover:bg-blue-950 text-white"
          :loading="isCreating"
          :disabled="isCreating"
          @click="submitnewContracts"
        >
          Create
        </UButton>
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
