<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container class="pa-0" fluid>
        <v-row>
          <v-col cols="12" lg="4" class="pt-16 mx-auto">
            <v-card elevation="0" max-width="600">
              <v-card-title class="text-center">
                <h3 class="font-weight-black mt-5">Track$pense</h3>
              </v-card-title>

              <v-card-text class="pt-4">
                <v-divider class="my-5"></v-divider>

                <LoginForm></LoginForm>
                <v-divider class="my-5"></v-divider>

                <h4 class="text-center">
                  Don't have account?
                  <RouterLink class="text-cyan-accent-3 font-weight-black" to="/register">
                    Click here to Register
                  </RouterLink>
                </h4>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
