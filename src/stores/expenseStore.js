import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { ref } from 'vue'

export const useExpenseStore = defineStore('expenseStore', () => {
  //States
  const expenses = ref([])
  const isLoading = ref(false)

  //Get all expense from data base
  async function getAllExpenses() {
    isLoading.value = true
    const { data, error } = await supabase.from('expenses').select('*')

    expenses.value = data

    if (error) throw error('Failed to load Expenses')
  }

  //Add expenses
  async function addExpenses({ title, amount, category, description, date }) {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error('User fetch error:', userError)
      return null
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          user_id: user.id,
          title,
          amount: Number(amount),
          category,
          date: date || new Date().toISOString(),
          description,
        },
      ])
      .select()

    if (error) {
      console.error('Supabase insert error:', error)
      throw new Error('Failed to add Expense')
    }

    await getAllExpenses()
    return data
  }

  //Update an expense
  async function updateExpense(id, updates) {
    const { data, error } = await supabase.from('expenses').update(updates).eq('id', id).select()

    if (error) throw new Error('Failed to update Expense')
    return data
  }

  // Delete an expense
  async function deleteExpense(id) {
    const { error } = await supabase.from('expenses').delete().eq('id', id)

    if (error) throw new Error('Failed to delete Expense')
    await getAllExpenses()
  }

  return {
    expenses,
    isLoading,
    getAllExpenses,
    addExpenses,
    updateExpense,
    deleteExpense,
  }
})
