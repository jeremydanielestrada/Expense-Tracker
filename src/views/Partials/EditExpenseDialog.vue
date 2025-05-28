<script setup>
import { useExpenseStore } from '@/stores/expenseStore'
import { requiredValidator } from '@/utils/validators'
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  expenseId: String,
})
const emits = defineEmits(['update:modelValue'])
const close = () => emits('update:modelValue', false)

const expenseStore = useExpenseStore()
const isLoading = ref(false)

const formData = ref({
  title: '',
  amount: '',
  categoryOptions: ['Foods', 'Bill', 'Others'],
  categorySelected: '',
  description: '',
  date: new Date().toISOString(),
})

// Load existing expense into formData when dialog opens
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen && props.expenseId) {
      try {
        const data = await expenseStore.getExpenseById(props.expenseId)
        formData.value = {
          title: data.title,
          amount: data.amount,
          categoryOptions: ['Foods', 'Bill', 'Others'],
          categorySelected: data.category,
          description: data.description,
          date: data.date,
        }
      } catch (err) {
        console.error(err.message)
      }
    }
  },
)

const handleUpdate = async () => {
  isLoading.value = true
  try {
    await expenseStore.updateExpense(props.expenseId, {
      title: formData.value.title,
      amount: Number(formData.value.amount),
      category: formData.value.categorySelected,
      description: formData.value.description,
      date: formData.value.date,
    })
    close()
  } catch (err) {
    console.error(err.message)
    alert('Failed to update expense.')
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
      <v-card-title>Edit Expense</v-card-title>
      <v-form fast-fail @submit.prevent="handleUpdate">
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
        <v-btn block color="cyan-darken-3" type="submit" :loading="isLoading"> Update </v-btn>
      </v-form>
      <v-card-actions>
        <v-btn @click="close">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
