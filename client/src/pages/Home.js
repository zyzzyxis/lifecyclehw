import React, {useEffect, useState} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Clock from '../components/Clock'

// functional component
const Home = () => {
    // state for component
    const [testData, setTestData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    // mount
    useEffect(()=>{
        getData()
    },[])

    const getData = async()=>{
        try{
          let res = await axios.get(`/api/api_test`)
          setTestData(res.data)
          setLoading(false)
        } catch(err){
            alert('err')
            setLoading(false)
        }
        
    }
    if(loading) return <p>Loading</p>
    return(
        <div>
            <h1>Home</h1>
            {testData && testData.dataHere}
            <Clock />
        </div>
    )
}
export default Home


