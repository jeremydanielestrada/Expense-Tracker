import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExpenseStore = defineStore('expenseStore', () => {
  //States
  const expenses = ref([])

  //Get all expense from data base
  async function getAllExpenses() {
    const { data, error } = await supabase.from('expenses').select('*')

    if (error) throw error('Failed to load Expenses')
    expenses.value = data
  }

  //Add expenses
  async function addExpenses(user_id) {
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
          amount,
          category,
          date,
          description,
        },
      ])
      .select()

    if (error) throw new Error('Failed to add Expense')
    // Optionally, refresh the list
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
    getAllExpenses,
    addExpenses,
    updateExpense,
    deleteExpense,
  }
})
