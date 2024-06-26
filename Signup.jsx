
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
function Signup() {
  const[cookies,setCookie]=useCookies([]);
  const nav=useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
      const username=document.querySelector(".username").value;
      const email=document.querySelector(".email").value;
      const password=document.querySelector(".password").value;
      const SignupResponse=await fetch(`${import.meta.env.VITE_API_URL}/user/new`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
          userName:username,
          emailID:email,
          password:password
        })
      });
      const signUpData=await SignupResponse.json();
        if(signUpData.status==="success"){
            setCookie('token',signUpData.accessToken,{maxAge:3600})
            setCookie('userId',signUpData.userDetails.userID,{maxAge:3600})
            const error=document.querySelector(".error");
            error.textContent="Register successful!!"
            error.style.display="block"
            setTimeout(()=>{
                nav('/expense')
            },1000)
        }else{
            const error=document.querySelector(".error");
            error.style.display="block"
        }
      }
  


  return (
    <div className="signupform">
    <form  id='signupform' onSubmit={handleSubmit}>
    <input type="text" className="username" placeholder='Enter User Name'/>
    <input type="email" className="email" placeholder='Enter Email'required/>
    <input type="password" className="password" placeholder='Enter
    Password' required/>
    <button type="submit">Login</button>
    <Link to="/">Already have an account</Link>
    <p className="error" style={{marginTop:"10px", display:"none"}}>User already exist</p>
    
    </form>
    
</div>
  )
}


export default Signup