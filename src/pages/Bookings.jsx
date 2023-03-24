import { message, Table, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../components/PageTitle';
import { axiosInstance } from '../helpers/axiosInstance';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { useReactToPrint } from 'react-to-print';

function Bookings() {
  const dispatch = useDispatch();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/bookings/getbookingsbyuserid", {});
      dispatch(hideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            ...booking.user,
            key: booking._id
          }
        })
        setBookings(mappedData);
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getBookings()
  }, []);

  const columns = [
    {
      title: "Bus",
      dataIndex: "busName",
      key: 1,
    },
    {
      title: "Bus Number",
      dataIndex: "busNumber",
      key: 2
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      key: 3
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
      key: 4
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: 5,
      render:(record)=>(
        record.join(", ")
      )
    },
    {
      title: "Action",
      dataIndex: "action",
      key: 6,
      render: (text, record) => (
        <div>
          <h1 className='text-md underlined' onClick={() => {
            setSelectedBooking(record);
            setShowPrintModal(true);
          }}>Print Ticket</h1>
        </div>
      )
    }
  ]

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <PageTitle title="Bookings" />
      <Table columns={columns} dataSource={bookings} className="my-3"/>

      {showPrintModal && <Modal title="Print Ticket" footer={null} open={showPrintModal} onCancel={() => {
        setShowPrintModal(false);
        setSelectedBooking(null);
      }}>
        <div className="d-flex flex-column p-5" ref={componentRef}>
          <h1 className='text-lg mt-3'>Bus : {selectedBooking.busName}</h1>
          <h1 className='text-md text-secondary'>{selectedBooking.from} - {selectedBooking.to}</h1>
          <hr />

          <p>
            <span className='text-secondary'>Journey Date</span> {":"} {selectedBooking.journeyDate}
          </p>
          <p>
            <span className='text-secondary'>Departure</span> {":"} {selectedBooking.departure}
          </p>
          <hr />
          <p className='text-lg'>
            <span className='text-secondary'>Seats Booked</span> {":"} {selectedBooking.seats.join(", ")}
          </p>
          <hr />
          <p className='text-lg'>
            <span className='text-secondary'>Total Amount</span> {":"} ₹{selectedBooking.fare*selectedBooking.seats.length}
          </p>
        </div>
          <div className="d-flex justify-content-end">
            <button className='primary-btn' onClick={handlePrint}>Print</button>
          </div>
      </Modal>}
    </div>
  )
}

export default Bookings
