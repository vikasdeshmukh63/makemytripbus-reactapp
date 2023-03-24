import React from 'react';
import {useNavigate} from "react-router-dom"

function Bus({bus}) {
const navigate = useNavigate()
  return (
    <div className='card-2 p-3'>
      <h1 className='text-xl primary-text fw-bold'>{bus.busName}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
            <p>From-</p>
            <p>{bus.from}</p>
        </div>

        <div>
            <p>To-</p>
            <p>{bus.to}</p>
        </div>

        <div>
            <p>Fare-</p>
            <p>₹{bus.fare}</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-end">
        <div>
            <p>Journey Date-</p>
            <p>{bus.journeyDate}</p>
        </div>

        <button className="secondary-btn" onClick={()=>{
          navigate(`/booknow/${bus._id}`)
        }} >Book Now</button>
      </div>
    </div>
  )
}

export default Bus
