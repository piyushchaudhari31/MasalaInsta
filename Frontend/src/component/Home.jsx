import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import '../css/reels.css'
import ReelFeed from '../page/ReelFeed'
import toast from 'react-hot-toast';
import BottomNav from '../page/BottomNav';
import { reelsvideo } from '../context/Reelsvideo';

const Home = () => {
    const [ videos, setVideos ] = useState([])
    const {url} = useContext(reelsvideo)
    

    
    

    useEffect(() => {
      toast.promise(
        axios.get(`${url}/api/food`, { withCredentials: true }),{
          loading:"Loading..",
          success:"",
          error:""
        }
      ).then(response => {
                setVideos(response.data.foodItem)
            })
            .catch(() => {})
    }, [])

    

    async function likeVideo(item) {
        
        
        const response = await axios.post(`${url}/api/food/like`, { foodId: item._id }, {withCredentials: true})
        

        if(response.data.like){
            
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likecount: v.likecount + 1 } : v))
        }else{
            
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likecount: v.likecount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        
        
        const response = await axios.post(`${url}/api/food/save`, { foodId: item._id }, { withCredentials: true })
        
        
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savecount: v.savecount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savecount: v.savecount - 1 } : v))
        }
    }

    return (
        <div>
            
            

        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="Login First"
        />
        <BottomNav />
        </div>
        
    )
}

export default Home