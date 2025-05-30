<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useExpenseStore } from '@/stores/expenseStore'
import EditExpenseDialog from '../partials/EditExpenseDialog.vue'
import ExpenseDialog from '../partials/ExpenseDialog.vue'

const expenseStore = useExpenseStore()

onMounted(async () => {
  await expenseStore.getAllExpenses()
})

//Get category color
function getCategoryColor(category) {
  const colorMap = {
    Foods: 'teal-accent-3',
    Bills: 'cyan-accent-3',
    Others: 'light-blue-accent-3',
  }
  return colorMap[category] || 'cyan-accent-3'
}

const addExpense = ref(false)
const editExpense = ref(false)
const selectedExpenseId = ref(null)

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
              <v-card-text class="d-flex align-center justify-center text-center ga-6">
                <div
                  v-for="(percent, category) in expenseStore.categoryPercentages"
                  :key="category"
                  class="d-flex flex-column ga-4"
                >
                  <strong class="mr-3">{{ category }}</strong>

                  <div class="d-flex align-center">
                    <v-progress-circular
                      :model-value="percent"
                      :size="100"
                      :width="15"
                      :color="getCategoryColor(category)"
                    >
                      {{ percent }}%
                    </v-progress-circular>
                  </div>
                </div>
              </v-card-text>
              <div class="text-center ma-2">
                <h1>
                  {{
                    Number(expenseStore.totalAmount).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'PHP',
                    })
                  }}
                </h1>
                <h3>TOTAL AMOUNT</h3>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card
              v-for="expense in expenseStore.expenses"
              :key="expense.id"
              max-width="500"
              class="ma-2"
            >
              <v-card-title class="d-flex justify-space-between"
                ><p>
                  <b>{{ expense.title }}</b>
                </p>
                <p class="text-">
                  <strong>{{ expense.category }}</strong>
                </p>
              </v-card-title>
              <v-card-text>
                <p>{{ expense.description }}</p>
                <strong class="text-h6">
                  {{
                    Number(expense.amount).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'PHP',
                    })
                  }}
                </strong>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions class="d-flex justify-space-between">
                <p>{{ expense.date }}</p>
                <div class="d-flex align-center">
                  <v-btn icon @click="expenseStore.deleteExpense(expense.id)" color="red">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                  <v-btn icon @click="openEditDialog(expense.id)">
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
      <EditExpenseDialog v-model="editExpense" :expenseId="selectedExpenseId"></EditExpenseDialog>
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
