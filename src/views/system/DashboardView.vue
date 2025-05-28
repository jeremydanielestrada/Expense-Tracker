<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import ExpenseDialog from '@/views/Partials/ExpenseDialog.vue'
const addExpense = ref(false)

const sampleValue = ref(30)
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-text>
                <div class="d-flex flex-column ga-2">
                  <div>
                    <span class="mr-2">Foods</span>
                    <v-progress-circular
                      rotate="360"
                      v-model="sampleValue"
                      size="80"
                      width="15"
                      color="cyan-accent-1"
                    >
                      {{ sampleValue }}%
                    </v-progress-circular>
                  </div>

                  <div>
                    <span>Bills</span>
                    <v-progress-circular
                      rotate="360"
                      v-model="sampleValue"
                      size="80"
                      width="15"
                      color="cyan-accent-1"
                    >
                      {{ sampleValue }}%
                    </v-progress-circular>
                  </div>
                  <div>
                    <span>Others</span>
                    <v-progress-circular
                      rotate="360"
                      v-model="sampleValue"
                      size="80"
                      width="15"
                      color="cyan-accent-1"
                    >
                      {{ sampleValue }}%
                    </v-progress-circular>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-fab icon @click="addExpense = true" class="fab-bottom-center" color="cyan-darken-3" ripple>
        <v-icon>mdi-plus</v-icon>
      </v-fab>
      <ExpenseDialog v-model="addExpense"></ExpenseDialog>
    </template>
  </AppLayout>
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
