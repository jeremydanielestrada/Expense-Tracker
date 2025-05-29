import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'
import { ref, computed } from 'vue'

export const useExpenseStore = defineStore('expenseStore', () => {
  //States
  const expenses = ref([])
  const isLoading = ref(false)

  //Getters

  // Total amount of all expenses
  const totalAmount = computed(() => {
    return expenses.value.reduce((sum, item) => sum + Number(item.amount), 0)
  })

  //Category totals
  const categoryBreakdown = computed(() => {
    const result = {}
    expenses.value.forEach((item) => {
      const category = item.category
      if (!result[category]) result[category] = 0
      result[category] += Number(item.amount)
    })
    return result
  })

  // Category percentages
  const categoryPercentages = computed(() => {
    const total = totalAmount.value
    const breakdown = categoryBreakdown.value
    const percentages = {}

    for (const category in breakdown) {
      percentages[category] = total > 0 ? ((breakdown[category] / total) * 100).toFixed(1) : 0
    }

    return percentages
  })

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

  // Get a single expense by ID
  async function getExpenseById(id) {
    const { data, error } = await supabase.from('expenses').select('*').eq('id', id).single()

    if (error) {
      console.error('Error fetching expense:', error)
      throw new Error('Failed to fetch Expense')
    }

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
    totalAmount,
    categoryBreakdown,
    categoryPercentages,
    getAllExpenses,
    addExpenses,
    updateExpense,
    deleteExpense,
    getExpenseById,
  }
})
