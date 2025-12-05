import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast'
import axios from 'axios'
import { reelsvideo } from '../context/Reelsvideo';

const FoodPartnerRegister = () => {

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const {url} = useContext(reelsvideo)
  
  const submitHandler = (data) => {
    toast.promise(
      axios.post(`${url}/api/auth/food-partner/register`, data, { withCredentials: true }),
      {
        loading: "Create a Food-Partner",
        success: (res) => res.data.message,
        error: (err) => err.response.data.message || "Something Went wrong"
      }
    )
      .then(() => {
        navigate('/food-partner/login')
      }).catch((err) => {
        console.log(err.message);
      })
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <header>
          <h1 className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
        </header>

        <nav className="auth-alt-action" style={{ marginTop: '-4px' }}>
          <strong style={{ fontWeight: 600 }}>Switch:</strong> 
          <Link to="/user/login">User</Link> • 
          <Link to="/food-partner/login">Food partner</Link>
        </nav>

        <form className="auth-form" onSubmit={handleSubmit(submitHandler)}>

          <div className="field-group">
            <label>Business Name</label>
            <input {...register("businessName")} placeholder="Tasty Bites" required />
          </div>

          <div className="two-col">
            <div className="field-group">
              <label>Contact Name</label>
              <input {...register("contactName")} placeholder="Full Name" required />
            </div>
            <div className="field-group">
              <label>Phone</label>
              <input maxLength={10} {...register("phone")} placeholder="7201 980 622" required />
            </div>
          </div>

          <div className="field-group">
            <label>Email</label>
            <input {...register("email")} type="email" placeholder="business@example.com" required />
          </div>

          <div className="field-group">
            <label>Password</label>
            <input {...register("password")} type="Password" placeholder="Create password" required />
          </div>

          <div className="field-group">
            <label>Address</label>
            <input {...register("address")} placeholder="123 Market Street" required />
          </div>

          <div className="field-group">
            <label>Gender</label>
            <div style={{ display: "flex", gap: "20px", marginTop: "5px" }}>
              
              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input type="radio" value="male"{...register("gender")} required/>Male
              </label>

              <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input type="radio" value="female"  {...register("gender")} />
                Female
              </label>

            </div>
          </div>

          <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input type="checkbox" required />This email is a Google account</label>

          <button className="auth-submit" type="submit">Create Food-Partner Account</button>
        </form>

        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
