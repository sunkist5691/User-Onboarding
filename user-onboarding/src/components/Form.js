import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import schema from './schema'
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

// Form Component
const Form = ({addUserList}) => {

   // Info State
   const [info, setInfo] = useState({

      id: Date.now(),
      name: '',
      email: '',
      password: '',
      position: '',
      termStatus: false

   })

   // Error State
   const [error, setError] = useState({

      name: '',
      email: '',
      password: '',
      position: '',
      termStatus: ''

   })

   // submit button State
   const [disabled, setDisabled] = useState(true)

   // Validation using 'Yup schema'
   const validation = (e, value) => {

      yup
         .reach(schema, e.target.name) // second argument is a 'path: which is 'key' in object'
         .validate(value)
         .then(valid => {
            // If there are no error, change the value of that key into empty string
            setError({
               ...error,
               [e.target.name]: ''
            })
         })
         .catch(err => {
            // If we get error, 'err' returns { name: 'ValidationError, errors: ['age must be a number or somethingelse']}
            // change the value of that key into 'error.erros[0]', which is the message
            setError({
               ...error,
               [e.target.name]: err.errors[0]
            })
         })

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
         position: '',
         termStatus: false

      })

   }
   
   // Check if the info is passing without having any errors/ this useEffect only runs when after the rendering is finished and only if 'info' state changed and
   useEffect(() => {

      schema // schema is equal to 'yup.object().shape({...})'
         .isValid(info) // check the 'info' state and go over every 'key' and value to match with 'schema' key and value if fulfilled the restriction.
         .then((valid) => { // if the 'info' state doesn't give any errors when matching with 'schema', then returns 'true'
        setDisabled(!valid); // because 'valid' returns true, we want to change the state of 'disabled' to false. 
      });

    }, [info]);

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

         <label htmlFor='position'>
            What is your current position?
            <select 
               id='position' 
               name='position' 
               onChange={changeHandler} 
               value={info.position}
            >
               <option value=''>---------select---------</option>
               <option value='Jr. Developer'>Jr. Developer</option>
               <option value='Frontend Engineer'>Frontend Engineer</option>
               <option value='Backend Engineer'>Backend Engineer</option>
               <option value='QA Engineer'>QA Engineer</option>
               <option value='Dev Ops Engineer'>Dev Ops Engineer</option>
               <option value='UX Designer'>UX Designer</option>
               <option value='None of the options'>None of the options</option>
            </select>
         </label>

         {/* Submit button */}
         <Button disabled={disabled} type='submit'>Submit</Button>

      </WrapForm>
   )

}



export default Form