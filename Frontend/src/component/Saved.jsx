import React, { useContext, useEffect, useState } from 'react'
import '../css/reels.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import SaveBottom from '../page/SaveBottom'
import Savereelfeed from '../page/Savereelfeed'
import { reelsvideo } from '../context/Reelsvideo'

const Saved = () => {
    const [videos, setVideos] = useState([])

    const {url} = useContext(reelsvideo)


    useEffect(() => {
        
            axios.get(`${url}/api/food/save`,{}, { withCredentials: true })
        .then(response => {

                const savedFoods = response.data.savedFoods.map((item) => ({

                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likecount: item.food.likecount,
                    savecount: item.food.savecount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            }).catch(()=>{
                toast.error("something went wrong")
            })
    }, [videos])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
            toast('Removed from Saved!', {
                icon: '❌',
                position:'bottom-center',
                style: {
                    borderRadius: '10px',
                    background: '#333',  
                    color: '#fff',           
                },
            });
        } catch {

        }
    }

    return (
    <div className="reels-page">
        
    
        <h1 className="save_page_title">Saved</h1>

        <div className="reels-feed">
            <Savereelfeed
                items={videos}
                onSave={removeSaved}
                emptyMessage="Loading.."
            />
        </div>

        <SaveBottom />
    </div>
);

}

export default Saved