import { createContext, useEffect, useState } from "react"
import axios from 'axios'


export const reelsvideo = createContext(null)

const Reelsvideo = (props) => {

  const [data, setdata] = useState('')
  
  const url = "https://masalainsta-backend.onrender.com"
  

  async function getData() {
    try {
      const response = await axios.get(`${url}/api/auth/getData`, { withCredentials: true })
      setdata(response.data.user); 

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getData()
  },[data])



  const exportData = {
    data,url
  }
  return (
    <div>
      <reelsvideo.Provider value={exportData}>{props.children}</reelsvideo.Provider>

    </div>
  )
}

export default Reelsvideo
