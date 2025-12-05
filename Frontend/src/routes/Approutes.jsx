import React from 'react'
import {Route, Routes} from 'react-router-dom'
import UserRegister from '../auth/UserRegister'
import UserLogin from '../auth/UserLogin'
import FoodPartnerRegister from '../auth/FoodPartnerRegister'
import FoodPartnerLogin from '../auth/FoodPartnerLogin'
import ChooseRegister from '../auth/ChooseRegister'
import Home from '../component/Home'
import PagenotFound from '../PagenotFound'
import CreateFoodPartner from '../food-partner/CreateFoodPartner'
import Profile from '../food-partner/Profile'
import Saved from '../component/Saved'

const Approutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/user/register' element={<UserRegister />}></Route>
            <Route path='/user/login' element={<UserLogin />}></Route>
            <Route path='/food-partner/register' element={<FoodPartnerRegister />}></Route>
            <Route path='/food-partner/login' element={<FoodPartnerLogin />}></Route>
            <Route path='/Userchoise' element={<ChooseRegister />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Create-Food' element={<CreateFoodPartner />}></Route>

            <Route path='/food-partner/:id' element={<Profile />}></Route>
            <Route path='/saved' element={<Saved />}></Route>


            <Route path='*' element={<PagenotFound />}></Route>

        </Routes>
        
      
    </div>
  )
}

export default Approutes
