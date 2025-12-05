import React, { useContext } from 'react';
import '../css/style.css'
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { reelsvideo } from '../context/Reelsvideo';

const UserLogin = () => {

  const navigate = useNavigate();
  const {register , handleSubmit , reset} = useForm()
  const {url} = useContext(reelsvideo)
  

  const SUbmitHandler = async(data)=>{
    toast.promise(
      axios.post(`${url}/api/auth/user/login`,data,{withCredentials:true}),
      {
        loading:"Loading..",
        success:(res)=>{
          localStorage.setItem("token",res.data.token)
          
          return res.data.message},
        error:(err)=>err.response.data.message
      }

    ).then(()=>{
      navigate('/')
    }).catch((err)=>{
      console.log(err.message);
      
    })
  }

  

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="user-login-title">
        <header>
          <h1 id="user-login-title" className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue your food journey.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit(SUbmitHandler)}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input  {...register("email")}  type="email" placeholder="you@example.com" required/>
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input {...register("password")} type="Password" placeholder="••••••••"  required/>
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;