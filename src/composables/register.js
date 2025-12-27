import { supabase, formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export function useRegister() {
  // Utilize pre-defined vue functions
  const router = useRouter()

  // Load Variables
  const formDataDefault = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  }
  const formData = ref({
    ...formDataDefault,
  })
  const formAction = ref({
    ...formActionDefault,
  })
  const refVForm = ref()

  // Register Functionality
  const onSubmit = async () => {
    // Reset Form Action utils
    formAction.value = { ...formActionDefault, formProcess: true }

    // DEBUG: Log the signup attempt
    console.log('Attempting signup with:', formData.value.email)

    // TRY SIMPLE VERSION FIRST (without metadata)
    const { data, error } = await supabase.auth.signUp({
      email: formData.value.email,
      password: formData.value.password,
      // Uncomment this after testing if simple version works:
      options: {
        data: {
          first_name: formData.value.firstname, // Use snake_case
          last_name: formData.value.lastname,
        },
      },
    })

    // DEBUG: Log the full response
    console.log('Signup response:', { data, error })

    if (error) {
      // Add Error Message and Status Code
      console.error('Signup error details:', error)
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } else if (data) {
      // Add Success Message
      console.log('Signup successful:', data)
      formAction.value.formSuccessMessage = 'Successfully Registered Account.'
      // Redirect Acct to Dashboard
      router.replace('/dashboard')
    }

    // Reset Form
    refVForm.value?.reset()
    // Turn off processing
    formAction.value.formProcess = false
  }

  // Trigger Validators
  const onFormSubmit = () => {
    refVForm.value?.validate().then(({ valid }) => {
      if (valid) onSubmit()
    })
  }

  return { formData, formAction, refVForm, onFormSubmit }
}
