<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'
import { h, ref, computed, onMounted } from 'vue'
import { useCurrentTeamEmployees, useDeleteEmployes, useCreateEmployee } from '@@/queries/dashboard/employees'
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
const selectedEmployee = ref<adminRequestsModel | null>(null)

const { data, refresh: refreshEmployees, pending } = useCurrentTeamEmployees()

onMounted(() => {
  refreshEmployees()
})

const employees = computed(() => data.value as teamsResponse | undefined)

function openDeleteModal(admin: adminRequestsModel) {
  selectedEmployee.value = admin
  modalTitle.value = `Delete ${admin.full_name}`
  modalMessage.value = `Are you sure you want to delete ${admin.full_name}?`
  deleteModalOpen.value = true
}

function cancelDelete() {
  selectedEmployee.value = null
  deleteModalOpen.value = false
}

const isDeleting = ref(false)

async function confirmDelete() {
  if (!selectedEmployee.value) return

  const { execute } = useDeleteEmployes(selectedEmployee.value.id)
  isDeleting.value = true

  try {
    await execute()
    toast.add({
      title: `${selectedEmployee.value.full_name} It was successfully deleted`,
      color: 'red',
      icon: 'i-lucide-trash-2',
    })
    refreshEmployees()
    deleteModalOpen.value = false
    selectedEmployee.value = null
  } catch (err) {
    toast.add({
      title: `Failed to delete ${selectedEmployee.value.full_name}`,
      description: err?.data?.message,
      color: 'red',
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
          color: 'green',
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
    header: 'Specialization',
    cell: ({ row }) => {
      const specialization = row.original.specialization

return specialization?.name ?? 'undefined'
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
const newEmployee = ref({
  full_name: '',
  email: '',
  password: '',
  national_number: '',
  position: '',
  phone: '',
  address: '',
  date_accession: '2000-01-01',
  image: null,
  specialization_id: '',
})

const isCreating = ref(false)

async function submitNewEmployee() {
  const formData = new FormData()

  Object.entries(newEmployee.value).forEach(([key, val]) => {
    if (key === 'image' && val instanceof File) {
      formData.append('image', val)
    } else {
      formData.append(key, String(val))
    }
  })

  const { execute } = useCreateEmployee(formData)
  isCreating.value = true

  try {
    await execute()
    toast.add({
      title: 'Employee created successfully',
      color: 'green',
      icon: 'i-lucide-check-circle',
    })
    refreshEmployees()
    createModalOpen.value = false
    newEmployee.value = {
      full_name: '',
      email: '',
      password: '',
      national_number: '',
      position: '',
      phone: '',
      address: '',
      date_accession: '2000-01-01',
      image: null,
      specialization_id: '',
    }
  } catch (err) {
    toast.add({
      title: 'Failed to create employee',
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
            Team Members
          </h1>
          <UButton
            class="bg-primary hover:bg-blue-950 text-white"
            @click="createModalOpen = true"
          >
            + Add Employee
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
          v-else-if="employees?.data"
          class="rounded-lg shadow-xl pb-5"
        >
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
      title="Add New Employee"
      :ui="{ footer: 'justify-end' }"
    >
      <template #body>
        <div class="grid grid-cols-2 gap-4">
          <UInput
            v-model="newEmployee.full_name"
            placeholder="Full Name"
          />
          <UInput
            v-model="newEmployee.email"
            placeholder="Email"
          />
          <UInput
            v-model="newEmployee.password"
            type="password"
            placeholder="Password"
          />
          <UInput
            v-model="newEmployee.national_number"
            placeholder="National Number"
          />
          <USelectMenu
            v-model="newEmployee.position"
            :items="['مشرف', 'موظف مالي']"
            placeholder="Position"
          />
          <UInput
            v-model="newEmployee.phone"
            placeholder="Phone"
          />
          <UInput
            v-model="newEmployee.address"
            placeholder="Address"
          />
          <UInput
            v-model="newEmployee.date_accession"
            placeholder="(YYYY-MM-DD)"
          />
          <UInput
            v-model="newEmployee.specialization_id"
            placeholder="Specialization ID"
          />
          <UInput
            type="file"
            @change="e => newEmployee.image = e.target.files[0]"
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
          @click="submitNewEmployee"
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
