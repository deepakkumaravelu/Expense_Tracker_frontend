import React from 'react'
import { useCookies } from 'react-cookie'
const Logout = () => {
    const[cookies,setCookie,removeCookie]=useCookies();
  const handleLogout=()=>{
    removeCookie("userId");
    removeCookie("token");
  }
  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px",
        margin: "5px",
        backgroundColor: "red",
        color: "white",
        borderRadius: "5px"
      }}
    >
      Logout
    </button>

  )
}

export default Logout