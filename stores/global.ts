import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', () => {
    const token = ref('')
    const role = ref<string>()

    return { role, token }
}, {
    persist: {
        pick: ['token', 'role'],
    },

})
