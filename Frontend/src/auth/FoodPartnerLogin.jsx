import React, { useContext } from 'react';
import '../css/style.css'
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast';
import axios from 'axios';
import { reelsvideo } from '../context/Reelsvideo';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();
  const {register , handleSubmit , reset} = useForm()
  const {url} = useContext(reelsvideo)
  

  const SubmitHandler = (data)=>{
    try {
      toast.promise(
        axios.post(`${url}/api/auth/food-partner/login`,data,{withCredentials:true}),{
          loading:"Loading..",
          success:(res)=>res.data.message || "Food-Partner Login successfully",
          error:(err)=>err.response.data.message || "Something went Wrong"
        }
      ).then(()=>{
        navigate('/Create-Food')
        
      }).catch((err)=>{
        console.log(err.message);
      })
      
      
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit(SubmitHandler)}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input {...register("email")}  type="email" placeholder="business@example.com" autoComplete="email" required/>
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input {...register("password")} type="password" placeholder="Password" autoComplete="current-password" required/>
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;