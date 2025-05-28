<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import ExpenseDialog from '@/views/Partials/ExpenseDialog.vue'

const addExpense = ref(false)
</script>

<template>
  <AppLayout>
    <template #content>
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
