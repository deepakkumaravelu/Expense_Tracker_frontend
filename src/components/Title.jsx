import React, { useState } from 'react'


const Title = ({title,u}) => {
    
   
  return (
    <>
    
    {u?<p>{title.toUpperCase()}</p>:<p>{title.toLowerCase()}</p>}
</>
    
  )
}

export default Title