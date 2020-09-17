import React from 'react'
import styled from 'styled-components'

const WrapInfo = styled.section `

   border: solid 2px black;
   border-radius: 0.7rem;
   width: 25%;
   margin: 2%;

`



const UserList = ({user}) => {

   return (
      <WrapInfo>
         <p>{user.name}</p>
         <p>{user.email}</p>
      </WrapInfo>
   )

}


export default UserList