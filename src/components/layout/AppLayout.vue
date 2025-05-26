<script setup>
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authStore'
import { onMounted } from 'vue'
import SideProfileNavigation from '@/components/layout/SideProfileNavigation.vue'

const isSideNavigation = ref(false)

//Use Pinia Store
const authStore = useAuthUserStore()

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

<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar class="px-3" :color="theme === 'light' ? 'cyan-accent-2' : 'cyan-darken-2'" border>
        <v-btn icon size="large" @click="isSideNavigation = !isSideNavigation" v-if="isLoggedIn">
          <v-icon> mdi-account-outline</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          class="me-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="plain"
          slim
          @click="onToggleTheme"
        ></v-btn>
      </v-app-bar>

      <SideProfileNavigation
        v-if="isLoggedIn"
        :isDrawerVisible="isSideNavigation"
      ></SideProfileNavigation>
      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-fab icon v-if="isLoggedIn" class="fab-bottom-center" color="cyan-darken-3" ripple>
        <v-icon>mdi-plus</v-icon>
      </v-fab>
    </v-app>
  </v-responsive>
</template>

<style scoped>
.fab-bottom-center {
  position: fixed;
  left: 50%;
  bottom: 32px; /* adjust as needed */
  transform: translateX(-50%);
  z-index: 1000;
}
</style>
