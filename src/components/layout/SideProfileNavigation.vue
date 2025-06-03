<script setup>
import { ref, computed } from 'vue'
import { useAuthUserStore } from '@/stores/authStore'
import { supabase, formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { getAvatarText } from '@/utils/helpers'

const emits = defineEmits(['update:isDrawerVisible'])
const props = defineProps(['isDrawerVisible'])

const drawer = computed({
  get: () => props.isDrawerVisible,
  set: (val) => emits('update:isDrawerVisible', val),
})

// Utilize pre-defined vue functions
const router = useRouter()

// Use Pinia Store
const authStore = useAuthUserStore()

// Load Variables
const formAction = ref({
  ...formActionDefault,
})

// Logout Functionality
const onLogout = async () => {
  /// Reset Form Action utils; Turn on processing at the same time
  formAction.value = { ...formActionDefault, formProcess: true }

  // Get supabase logout functionality
  await supabase.auth.signOut()

  formAction.value.formProcess = false
  // Reset State
  setTimeout(() => {
    authStore.$reset()
  }, 2500)
  // Redirect to homepage
  router.replace('/')
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    temporary
    app
    @update:modelValue="emits('update:isDrawerVisible', $event)"
  >
    <v-list>
      <v-list-item>
        <v-avatar color="cyan-accent-2" size="large">
          <span class="text-h5">
            {{
              authStore.userData
                ? getAvatarText(authStore.userData.firstname + ' ' + authStore.userData.lastname)
                : ''
            }}
          </span>
        </v-avatar>
        <div class="d-inline">
          <strong class="ma-1">{{ authStore.userData.firstname }}</strong>
          <strong>{{ authStore.userData.lastname }}</strong>
        </div>
      </v-list-item>

      <v-list-item>
        <v-btn
          prepend-icon="mdi-logout"
          variant="plain"
          @click="onLogout"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
        >
          Logout
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
