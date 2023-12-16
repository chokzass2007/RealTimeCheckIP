import React from 'react'
import io from "socket.io-client";
import { useEffect, useState } from "react";


const CheckIP = () => {
    const [data,setData] = useState(null)
    useEffect(()=>{
        const socket = io('http://localhost:5000')

        socket.on('nodeStatus',({id,status,ip,label})=>{
            setData((prevData)=>({
                ...prevData,
                [id]:{id,label,status,ip}
            }))
        })
    },[])

    // console.log(data)

    if(data === null || data === undefined){
        return <h1>Loading...</h1>
    }

    const tableRows = Object.values(data).map((node)=>(
        <tr key={node.id}>
            <td>{node.id}</td>
            <td>{node.label}</td>
            <td>{node.status}</td>
            <td>{node.ip}</td>
            <td><span className={`status-circle ${node.status === 'up' ?'up' :'down'}`}/></td>
        </tr>
    ))

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>label</th>
                    <th>status</th>
                    <th>ip</th>
                    <th>color</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    </div>
  )
}

export default CheckIP