<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import ExpenseDialog from '@/views/Partials/ExpenseDialog.vue'
import EditexpenseDialog from '../Partials/EditexpenseDialog.vue'
import { useExpenseStore } from '@/stores/expenseStore'

const expenseStore = useExpenseStore()

onMounted(async () => {
  await expenseStore.getAllExpenses()
})

const addExpense = ref(false)
const editExpense = ref(false)
const selectedExpenseId = ref(null)
const sampleValue = ref(30)

const openEditDialog = (id) => {
  selectedExpenseId.value = id
  editExpense.value = true
}
</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card>
              <v-card-text class="d-flex align-center ga-10">
                <div class="d-flex flex-column ga-2">
                  <div>
                    <span class="mr-3">Foods</span>
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
                    <span class="mr-7">Bills</span>
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
                    <span class="mr-3">Others</span>
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
                <div class="text-center">
                  <h1>400</h1>
                  <h3>TOTAL AMOUNT</h3>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card v-for="expense in expenseStore.expenses" :key="expense.id" max-width="500">
              <v-card-title class="d-flex justify-space-between"
                ><p>
                  <b>{{ expense.title }}</b>
                </p>
                <p>
                  <b> Category: {{ expense.category }}</b>
                </p>
              </v-card-title>
              <v-card-text>
                <p>{{ expense.description }}</p>
                <p>{{ expense.amount }}</p>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between">
                <p>{{ expense.date }}</p>
                <div class="d-flex align-center">
                  <v-btn icon @click="expenseStore.deleteExpense(expense.id)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                  <v-btn icon @click="openEditDialog(id)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-fab icon @click="addExpense = true" class="fab-bottom-center" color="cyan-darken-3" ripple>
        <v-icon>mdi-plus</v-icon>
      </v-fab>

      <!-- Dialogs -->
      <ExpenseDialog v-model="addExpense"></ExpenseDialog>
      <EditexpenseDialog v-model="editExpense" :expenseId="selectedExpenseId"></EditexpenseDialog>
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
