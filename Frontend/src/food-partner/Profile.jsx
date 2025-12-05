import React, { useState, useEffect, useContext } from 'react'
import '../css/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { reelsvideo } from '../context/Reelsvideo'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const {url} = useContext(reelsvideo)

  
    useEffect(() => {

        toast.promise(
            axios.get(`${url}/api/food-partner/${id}`, { withCredentials: true }), {
            loading: "Loading..",
            success:"Fatch Successfully.",
            error:"Error"
        }

        ).then(response => {
            setProfile(response.data.foodpartner)
            setVideos(response.data.foodItems)
        }).catch((err) => {
            console.log(err.message);

        })
    }, [id])


    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">

                    <img className="profile-avatar" src={`${profile?.profilpic}`} alt="" />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.contactName}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                           {profile?.businessName}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">phone:-</span>
                        <span className="profile-stat-value">{profile?.phone}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">address:-</span>
                        <span className="profile-stat-value">{profile?.address}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />
            <div className='Videos'>
                <section className="profile-grid" aria-label="Videos">
                    {videos.map((v) => (
                        <div key={v._id} className="profile-grid-item">

                            <video
                                className="profile-grid-video"
                                src={`${v.video}`}
                                muted
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            />



                        </div>
                    ))}
                </section>
            </div>
        </main>
    )
}

export default Profile