import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../helpers/axiosInstance';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { message, Row, Col } from "antd";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';
import StripeCheckout from 'react-stripe-checkout';


function BookNow() {
  const params = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bus, setBus] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getBus = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/buses/getbusbyid", { _id: params.id },);
      dispatch(hideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message)
    }
  }

  const bookNow = async (transactionId) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/bookings/bookseat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId: transactionId
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate("/bookings");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message)
    }
  }

  const onToken = async (token) => {
    console.log(token)
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/bookings/payment", {
        token,
        amount: selectedSeats.length * bus.fare * 100
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getBus()
  }, []);
  return (
    <div>
      {bus && <Row className='mt-3' gutter={[30,30]}>
        <Col lg={12} xs={24} sm={24}>
          <h1 className="text-2xl primary-text">{bus.busName}</h1>
          <h1 className="text-md">{bus.from} - {bus.to}</h1>
          <hr />

          <div className='flex flex-col gap-3'>
            <p className='text-md'>Journey Date : {bus.journeyDate}</p>
            <p className='text-md'>Fare : ₹{bus.fare}</p>
            <p className='text-md'>Journey Date : {bus.journeyDate}</p>
            <p className='text-md'>Departure : {bus.departure}</p>
            <p className='text-md'>Arrival : {bus.arrival}</p>
            <p className='text-md'>Capacity : {bus.capacity}</p>
            <p className='text-md'>Seats Left : {bus.capacity - bus.seatsBooked.length}</p>
          </div>
          <hr />

          <div className="flex flex-col gap-3">
            <h1 className='text-2xl'>Selected Seats : {selectedSeats.join(",")}</h1>
          </div>
          <h1 className='text-2xl mt-2'>Fare : ₹{bus.fare * selectedSeats.length}</h1>

          <StripeCheckout
            billingAddress
            amount={selectedSeats.length * bus.fare * 100}
            currency="INR"
            token={onToken}
            stripeKey="pk_test_51MmycKSEXBJxvFOAFmtZxh5TIlfYe8bM1f8bv9I3sn13lNKO6KZp03bpOvRcvqMbAmT8VVcL7qZ2o5s1cJAvoqBB00XA7mdll1">

            <button className={`primary-btn mt-3 ${selectedSeats.length === 0 && "disabled-btn"}`} disabled={selectedSeats.length === 0}>Book Now</button>

          </StripeCheckout>

        </Col>
        <Col lg={12} xs={24} sm={24}>
          <SeatSelection selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} bus={bus} />
        </Col>
      </Row>}
    </div>
  )
}

export default BookNow
