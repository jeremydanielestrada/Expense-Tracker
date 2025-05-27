<script setup>
import { ref } from 'vue'
import { useExpenseStore } from '@/stores/expenseStore'

const props = defineProps({
  modelValue: Boolean,
})
const emits = defineEmits(['update:modelValue'])
const close = () => emits('update:modelValue', false)

const expenseStore = useExpenseStore()

//Load variables

const formattedDateTime = new Date(formData.value.date).toLocaleString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const formData = ref([
  {
    title: '',
    amount: '',
    category: ['Foods', 'Bill', 'Others'],
    description: '',
    date,
  },
])
</script>

<template>
  <v-dialog
    width="500px"
    :model-value="props.modelValue"
    @update:modelValue="emits('update:modelValue', $event)"
  >
    <v-card class="pa-3">
      <v-card-title>Add Expense</v-card-title>
      <v-form>
        <v-text-field label="What kind of expense?"></v-text-field>
        <v-text-field type="number" label="Amount"></v-text-field>
        <v-textarea
          clear-icon="mdi-close-circle"
          label="Text"
          model-value="This is clearable text."
          clearable
        ></v-textarea>
        <v-btn block color="cyan-darken-3"> Add </v-btn>
      </v-form>
      <v-card-actions>
        <v-btn @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
