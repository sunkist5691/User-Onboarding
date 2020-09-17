import * as yup from 'yup'

// Creating a validation format using 'Yup schema'
const schema = yup.object().shape({

   name: yup
      .string()
      .required('Username is required')
      .min(5, 'Must be 5 characters or longer'), // Validate minimum characters when user wrote less than 5 characters

   email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),

   password: yup
      .string()
      .required('Password is required')
      .min(7, 'Must be 7 characters or longer'),

   termStatus: yup
      .boolean()
      .oneOf([true], 'Please agree to term of use') // If it's true (checked), validation will pass, if not, the message 'Must be checked' will be pop out.

})


export default schema