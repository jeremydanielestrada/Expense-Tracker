<script setup>
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authStore'
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'

//Use Pinia Store
const authStore = useAuthUserStore()

const { mobile } = useDisplay()

//Load Variables
const isLoggedIn = ref(false)
const theme = ref(localStorage.getItem('theme') ?? 'light')

//Toggle Theme
const onToggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
}

// Get Authentication status from supabase
const getLoggedStatus = async () => {
  isLoggedIn.value = await authStore.isAuthenticated()
}

// Load Functions during component rendering
onMounted(() => {
  getLoggedStatus()
})
</script>
