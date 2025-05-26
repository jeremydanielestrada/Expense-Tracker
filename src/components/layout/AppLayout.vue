<script setup>
import { ref } from 'vue'
import { useAuthUserStore } from '@/stores/authStore'
import { onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const emits = defineEmits(['isDrawervisible'])

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
        <v-app-bar-title>
          <v-img src="/images/logo.png" width="60"></v-img>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn
          class="me-2"
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          variant="plain"
          slim
          @click="onToggleTheme"
        ></v-btn>
      </v-app-bar>

      <v-main>
        <slot name="content"></slot>
      </v-main>

      <v-fab icon location="bottom-center">
        <v-icon>mdi - plus</v-icon>
      </v-fab>
    </v-app>
  </v-responsive>
</template>
