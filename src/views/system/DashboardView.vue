<script setup>
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useExpenseStore } from '@/stores/expenseStore'
import EditExpenseDialog from '../partials/EditExpenseDialog.vue'
import ExpenseDialog from '../partials/ExpenseDialog.vue'
import AlertNotifications from '@/components/commons/AlertNotifications.vue'

const expenseStore = useExpenseStore()

const addExpense = ref(false)
const editExpense = ref(false)
const selectedExpenseId = ref(null)

const successDelete = ref(false)
const errorDelete = ref(false)

const deleteItem = async (id) => {
  try {
    await expenseStore.deleteExpense(id)
    successDelete.value = true
    setTimeout(() => {
      successDelete.value = false
    }, 2000)
  } catch {
    errorDelete.value = true
    setTimeout(() => {
      errorDelete.value = false
    }, 2000)
  }
}

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

const openEditDialog = (id) => {
  selectedExpenseId.value = id
  editExpense.value = true
}
</script>

<template>
  <AppLayout>
    <template #content>
      <AlertNotifications
        :succes-delete="successDelete"
        :error-delete="errorDelete"
      ></AlertNotifications>
      <v-container fluid class="mobile-layout pa-0">
        <!-- Fixed Progress Section -->
        <div class="progress-section">
          <v-card>
            <v-card-text class="text-center d-flex align-center justify-space-between">
              <div
                v-for="(percent, category) in expenseStore.categoryPercentages"
                :key="category"
                class="mb-4 d-flex align-center flex-column"
              >
                <v-chip :color="getCategoryColor(category)" class="ma-2">{{ category }}</v-chip>
                <v-progress-circular
                  :model-value="percent"
                  :size="80"
                  :width="10"
                  :color="percent === 0 ? 'grey' : getCategoryColor(category)"
                >
                  {{ percent.toFixed(1) }}%
                </v-progress-circular>
              </div>
            </v-card-text>
            <div class="text-center pb-4">
              <h2 class="mb-0">
                {{
                  Number(expenseStore.totalAmount).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'PHP',
                  })
                }}
              </h2>
              <strong class="text-grey">TOTAL AMOUNT</strong>
            </div>
          </v-card>
        </div>

        <!-- Scrollable Expense List -->
        <div class="expense-section mt-2">
          <v-card v-for="expense in expenseStore.expenses" :key="expense.id" class="mb-4 mx-2">
            <v-card-title class="d-flex justify-space-between">
              <b>{{ expense.title }}</b>
              <v-chip variant="outlined" :color="getCategoryColor(expense.category)">{{
                expense.category
              }}</v-chip>
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
              <small>{{ expense.date }}</small>
              <div class="d-flex align-center">
                <v-btn icon @click="deleteItem(expense.id)" color="red">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
                <v-btn icon @click="openEditDialog(expense.id)">
                  <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </div>
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

.mobile-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.progress-section {
  flex-shrink: 0;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.expense-section {
  flex: 1;
  overflow-y: auto;
}
</style>
