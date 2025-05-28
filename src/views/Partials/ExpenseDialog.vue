<script setup>
import { ref } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
import { requiredValidator } from '@/utils/validators'

const props = defineProps({
  modelValue: Boolean,
})
const emits = defineEmits(['update:modelValue'])
const close = () => emits('update:modelValue', false)

const expenseStore = useExpenseStore()
const isLoading = ref(false)

//Load variables

// const formattedDateTime = new Date(formDataDefault.value.date).toLocaleString('en-US', {
//   year: 'numeric',
//   month: 'short',
//   day: 'numeric',
// })

// Form data
const formData = ref({
  title: '',
  amount: '',
  categoryOptions: ['Foods', 'Bill', 'Others'],
  categorySelected: '',
  description: '',
  date: new Date().toISOString(),
})

//Add Expense Function

// Add Expense Function
const addExpense = async () => {
  isLoading.value = true
  try {
    await expenseStore.addExpenses({
      title: formData.value.title,
      amount: formData.value.amount,
      category: formData.value.categorySelected,
      date: formData.value.date,
      description: formData.value.description,
    })
    // Reset form
    formData.value = {
      title: '',
      amount: '',
      categoryOptions: ['Foods', 'Bill', 'Others'],
      categorySelected: '',
      description: '',
      date: new Date().toISOString(),
    }
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
          :items="formData.categoryOptions"
          v-model="formData.categorySelected"
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
