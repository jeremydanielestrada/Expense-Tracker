<script setup>
import { ref, watch } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'
import { requiredValidator } from '@/utils/validators'
import AlertNotifications from '@/components/commons/AlertNotifications.vue'
//Load variables
const props = defineProps(['modelValue', 'itemData'])
const emits = defineEmits(['update:modelValue'])

//Close the modal after submission
const close = () => emits('update:modelValue', false)

const expenseStore = useExpenseStore()
const isLoading = ref(false)

const categoryOptions = ['Foods', 'Bill', 'Others']

//Load variable
const formDataDefault = {
  title: null,
  amount: null,
  category: null,
  description: null,
  date: new Date().toISOString(),
}
const isAdded = ref(false)
const isError = ref(false)

const isUpdate = ref(false)

const formData = ref({
  ...formDataDefault,
})

//Check if item has a data
watch(
  () => props.itemData,
  () => {
    isUpdate.value = props.itemData ? true : false
    formData.value = props.itemData ? { ...props.itemData } : { ...formDataDefault }
  },
)

// Add Expense Function
const handleSubmit = async () => {
  //reset form
  isLoading.value = true

  try {
    isUpdate.value
      ? await expenseStore.updateExpense(formData.value)
      : await expenseStore.addExpenses(formData.value)
    formData.value = { ...formDataDefault }
    close()
    isAdded.value = true
  } catch (err) {
    console.error('Failed to add expense', err)
    isError.value = true
  } finally {
    isLoading.value = false
    await expenseStore.getAllExpenses()
  }
}
</script>

<template>
  <AlertNotifications
    :title="isUpdate ? 'Successfully Updated Item' : 'Successfully Added item'"
    :success="isAdded"
    :error="isError"
  ></AlertNotifications>
  <v-dialog
    width="500px"
    persistent
    :model-value="props.modelValue"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <v-card class="pa-3">
      <v-card-title>Add Expense</v-card-title>
      <v-form fast-fail @submit.prevent="handleSubmit">
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
        <v-btn block color="cyan-darken-3" type="submit" :loading="isLoading">
          {{ isUpdate ? 'Update' : 'Add' }}
        </v-btn>
      </v-form>
      <v-card-actions>
        <v-btn @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
