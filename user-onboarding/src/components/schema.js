import * as yup from 'yup'

/* 
   schema knowledge:
   shape() is acting like an extends of object
   so you can actually do something like this:

   object({
      a: string(),
      b: number(),
   }).shape({
      b: string(),
      c: number(),
   });
   
   would be exactly the same as: 

   object({
      a: string(),
      b: string(),
      c: number(),
   });

 */

// Creating a validation format using 'Yup schema'
const schema = yup.object().shape({

   name: yup
      .string() // Validate if it's string or not
      .required('Username is required') // this message will pop when inputs are emptied
      .min(5, 'Must be 5 characters or longer'), // Validate minimum characters when user wrote less than 5 characters

   email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),

   password: yup
      .string()
      .required('Password is required')
      .min(7, 'Must be 7 characters or longer'),
   
   position: yup
      .string()
      .required('Must select your current position')
      .min(1, 'Select one of the option'),

   termStatus: yup
      .boolean()
      .oneOf([true], 'Please agree to term of use') // If it's true (checked), validation will pass, if not, the message 'Must be checked' will be pop out.

})


export default schema