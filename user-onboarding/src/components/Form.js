import React, { useState } from 'react'
import styled from 'styled-components'
import * as yup from 'yup'
import axios from 'axios'

// Style Components
const WrapForm = styled.form `

   display: flex;
   flex-flow: column wrap;
   align-items: center;

`

const Error = styled.p `

   color: red;
   font-size: 0.8rem;

`

const Button = styled.button `

   width: 25%;

`
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



// Form Component
const Form = ({addUserList}) => {

   // Info State
   const [info, setInfo] = useState({

      id: Date.now(),
      name: '',
      email: '',
      password: '',
      termStatus: false

   })

   // Error State
   const [error, setError] = useState({

      name: '',
      email: '',
      password: '',
      termStatus: ''

   })

   // Submit State
   const [submit, setSubmit] = useState({

      disabled: true

   })

   // Validation using 'Yup schema'
   const validation = (e, value) => {

      yup
         .reach(schema, e.target.name)
         .validate(value)
         .then(valid => {
            // If there are no error, change the value of that key into empty string
            setError({
               ...error,
               [e.target.name]: ''
            })
         })
         .catch(err => {
            // If we get error, change the value of that key into 'error.erros[0]', which is the message
            setError({
               ...error,
               [e.target.name]: err.errors[0]
            })
         })

   }

   if(error.name.length === 0 || error.email.length === 0 || error.password.length === 0 || error.password.length === 0)
   {
      submit.disabled = false;
   }

   // Update Info state with every single character when I type going through 'validation'
   const changeHandler = (e) => {
      
      // Check if the current targeting input is checkbox or not
      let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

      // To make 'Synthetic Event asynchronously reusable, because React wraps native browser events into instances of the Synthetic Event
      //https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6
      //So this make possible that 'e' object from changeHandler reused at 'validation' as 'e' object.
      e.persist()
      
      // Validation to check each input are following the required() statement.
      validation(e, value)

      setInfo({ ...info, [e.target.name]: value })

   }

   // Function to reset and prevent default when submit the info
   const formSubmit = (e) => {

      e.preventDefault();

      // Send data of the object we like to send and get the data back from the server
      axios
         .post('https://reqres.in/api/users', info)
         .then( response => {

            //Function from App.js
            addUserList(response.data)
         })
         .catch( err => {
            console.log(err)
         })

      // Add info to User list

      //Resets
      setInfo({
         id: Date.now(),
         name: '',
         email: '',
         password: '',
         termStatus: false
      })

   }
   
 

   // Create JSX DOM elements
   return (

      <WrapForm onSubmit={ formSubmit }>

         {/* Name input */}
         <label htmlFor='name'>
            Name
            <input 
               id='name' 
               type='text'
               name='name' 
               placeholder='Name' 
               onChange={changeHandler} 
               value={info.name}
            />
            { error.name.length > 0 ? <Error>{error.name}</Error> : null /* show error message */}
         </label>

         {/* Email input */}
         <label htmlFor='email'>
            Email
            <input 
               id='email'
               type='email' 
               name='email' 
               placeholder='Email' 
               onChange={changeHandler} 
               value={info.email}
            />
            { error.email.length > 0 ? <Error>{error.email}</Error> : null /* show error message */}
         </label>
         
         {/* Password input */}
         <label htmlFor='password'>
            Password
            <input
               id='password'
               type='password' 
               name='password' 
               placeholder='Password' 
               onChange={changeHandler} 
               value={info.password}
            />
            { error.password.length > 0 ? <Error>{error.password}</Error> : null /* show error message */}
         </label>

         {/* Checkbox input */}
         <label htmlFor='termStatus'>
            Term of Service
            <input
               id='termStatus' 
               type='checkbox' 
               name='termStatus' 
               checked={info.termStatus}
               onChange={changeHandler}
            />
            { error.termStatus.length > 0 ? <Error>{error.termStatus}</Error> : null /* show error message */}
         </label>

         {/* Submit button */}
         <Button disabled={!submit.disabled} type='submit'>Submit</Button>
         
         {/* disabled={submit.disabled */}

      </WrapForm>
   )

}



export default Form