<script setup>
import { ref } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
import { requiredValidator } from '@/utils/validators'

const props = defineProps({
  modelValue: Boolean,
})
const emits = defineEmits(['update:modelValue'])

//Close the modal after submission
const close = () => emits('update:modelValue', false)

const expenseStore = useExpenseStore()
const isLoading = ref(false)

const categoryOptions = ['Foods', 'Bill', 'Others']

//Load variable
const formData = ref({
  title: null,
  amount: null,
  category: null,
  description: null,
  date: new Date().toISOString(),
})

const resetFormData = ref({
  ...formData,
})

// Add Expense Function
const addExpense = async () => {
  isLoading.value = true
  try {
    await expenseStore.addExpenses(formData.value)
    // Reset form
    resetFormData.value
    close()
  } catch (err) {
    console.error('Failed to add expense', err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <v-dialog
    width="500px"
    :model-value="props.modelValue"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <v-card class="pa-3">
      <v-card-title>Add Expense</v-card-title>
      <v-form fast-fail @submit.prevent="addExpense">
        <v-select
          label="Select Category"
          :items="categoryOptions"
          v-model="formData.category"
          :rules="[requiredValidator]"
        />
        <v-text-field label="Title" v-model="formData.title" :rules="[requiredValidator]" />
        <v-text-field
          type="number"
          label="Amount"
          v-model="formData.amount"
          :rules="[requiredValidator]"
        />
        <v-textarea
          label="Description"
          v-model="formData.description"
          clearable
          :rules="[requiredValidator]"
        />
        <v-btn block color="cyan-darken-3" type="submit" :loading="isLoading"> Add </v-btn>
      </v-form>
      <v-card-actions>
        <v-btn @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
