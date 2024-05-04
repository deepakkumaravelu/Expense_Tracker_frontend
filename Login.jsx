import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.css';
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies([])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Write API call here
    try {
      const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailID: email,
          password,
        }),
      });

      const loginData = await loginResponse.json()
      if(loginData.status === "failure"){
        alert(loginData.message)
      }else{
          console.log(loginData);
          setCookie('token', loginData.accessToken, { maxAge: 60 * 60 * 60 })
          setCookie('userId', loginData.userDetails.userID, { maxAge: 60 * 60 * 60 })
          navigate("/expense")
      }
    } catch (error) {
      console.log("API error");
    } finally{
        setLoading(false);
    }
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
    {!loading ?
    <div className="outform">
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="amount">Password</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Login</button>
      <Link to="/signup">new User</Link>
     
    </form>
    </div>:
    <div className="bdy">
      <div className="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
  </div>
  </div>
    }
    </>
  );
}