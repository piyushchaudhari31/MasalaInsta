import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { reelsvideo } from '../context/Reelsvideo';

const UserRegister = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm()
    const {url} = useContext(reelsvideo)
    
    const submitHanlder = (data) => {
        const submitData = {
            fullName: {
                firstName: data.firstName,
                lastName: data.lastName
            },
            email: data.email,
            password: data.password,
            gender:data.gender

        }

        toast.promise(
            axios.post(`${url}/api/auth/user/register`, submitData, { withCredentials: true }),
            {
                loading: "User Creating..",
                success: (res) => res.data.message || "User Register Successfully",
                error: (err) => err.response.data.message || "Something Went wrong"
            }
        ).then(() => {
            navigate('/user/login')
        }).catch((err) => {
            console.log(err.message);

        })


    }



    return (
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="user-register-title">
                <header>
                    <h1 id="user-register-title" className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Join to explore and enjoy delicious meals.</p>
                </header>
                <nav className="auth-alt-action" style={{ marginTop: '-4px' }}>
                    <strong style={{ fontWeight: 600 }}>Switch:</strong> <Link to="/user/login">User</Link> • <Link to="/food-partner/login">Food partner</Link>
                </nav>
                <form className="auth-form" onSubmit={handleSubmit(submitHanlder)}>
                    <div className="two-col">
                        <div className="field-group">
                            <label htmlFor="firstName">First Name</label>
                            <input id="firstName" {...register("firstName")} name="firstName" placeholder="Jane" autoComplete="given-name" required />
                        </div>
                        <div className="field-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" {...register("lastName")} name="lastName" placeholder="Doe" autoComplete="family-name" required />
                        </div>
                    </div>
                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" {...register("email")} type="email" placeholder="you@example.com" autoComplete="email" required />
                    </div>
                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" {...register("password")} type="password" placeholder="••••••••" autoComplete="new-password" required />
                    </div>
                    <div className="field-group">
                        <label>Gender</label>
                        <div style={{ display: "flex", gap: "20px", marginTop: "5px" }}>

                            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <input type="radio" value="male"{...register("gender")} required />male
                            </label>

                            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <input type="radio" value="female"  {...register("gender")} />
                                female
                            </label>

                        </div>
                    </div>
                    <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <input type="checkbox" required />This email is a Google account</label>
                    <button className="auth-submit" type="submit">Sign Up</button>
                </form>
                <div className="auth-alt-action">
                    Already have an account? <Link to="/user/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;