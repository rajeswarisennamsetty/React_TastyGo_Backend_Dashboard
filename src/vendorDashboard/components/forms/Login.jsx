/*import React,{useState} from 'react'
import {API_URL} from '../../data/ApiPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }
  

  const loginHandler = async(e)=>{
      e.preventDefault();
      setLoading(true);

      try {
          const response = await fetch(`${API_URL}/vendor/login`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({email, password})
          })
          const data = await response.json();
          if(response.ok){
            alert('Login success');
            setEmail("");
            setPassword("");
            localStorage.setItem('loginToken', data.token);
            console.log(" Token Stored:", localStorage.getItem('loginToken'));
            showWelcomeHandler()

          }
          const vendorId = data.vendorId
          console.log("checking for VendorId:",vendorId);
          const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
          
          const vendorData = await vendorResponse.json();
          if(vendorResponse.ok){
            const vendorFirmId = vendorData.vendorFirmId;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            //console.log("checking for firmId",vendorFirmId);
            console.log("my firmName is:",vendorFirmName);
            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorFirmName);
            //window.location.reload()
            
          }
          
      } catch (error) {
          alert("login fail")
      } finally {
        setLoading(false); 
      }
  }








  return (
    <div className='loginSection'>
        
        <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email' /><br />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password' /><br />
            <div className='btnSubmit'>
                <button type='submit'>Submit</button>
            </div>
        </form>
      
    </div>
  )
}

export default Login*/

import React, {useState} from 'react'
import { API_URL } from '../../data/ApiPath';



const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }
  

  const loginHandler = async(e)=>{
      e.preventDefault();
    setLoading(true); 
      try {
          const response = await fetch(`${API_URL}/vendor/login`, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
          })
          const data = await response.json();
          if(response.ok){
            alert('Login success');
            setEmail("");
            setPassword("");
            localStorage.setItem('loginToken', data.token);
            showWelcomeHandler()

          }
          const vendorId = data.vendorId
          console.log("checking for VendorId:",vendorId)
          const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
          window.location.reload()
          const vendorData = await vendorResponse.json();
          if(vendorResponse.ok){
            const vendorFirmId = vendorData.vendorFirmId;
            const vendorFirmName = vendorData.vendor.firm[0].firmName;
            console.log("my firmname is:",vendorFirmName);
            localStorage.setItem('firmId', vendorFirmId);
            localStorage.setItem('firmName', vendorFirmName)
          }
      } catch (error) {
          alert("login fail")
      } finally {
        setLoading(false); 
      }
  }

  return (
    <div className="loginSection">
<div className="loaderSection">
        
        <p>Login in process... Please wait</p>
      </div>
     <form  className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type="text" name='email' value = {email} onChange={(e)=>setEmail(e.target.value)} placeholder='enter your email'/><br />
            <label>Password</label>
            <input   type={showPassword? "text":"password"} name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='enter your password'/><br />

    <div className="btnSubmit">
        <button type= 'submit'>Submit</button>
    </div>
        </form>
    </div>
  )
}

export default Login