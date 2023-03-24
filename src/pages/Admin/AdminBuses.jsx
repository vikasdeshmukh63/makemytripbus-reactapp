import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance';
import { hideLoading, showLoading } from '../../redux/alertsSlice';

function AdminBuses() {

  const dispatch = useDispatch();
  const [selectedBus, setSelectedBus] = useState(null)
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);

  const getBuses = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/buses/getallbuses", {},);
      dispatch(hideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message)
    }
  }

  const deleteBus = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/buses/deletebus", { _id: id },);
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message)
    }
  }


  useEffect(() => {
    getBuses()
  }, []);

  const columns = [
    {
      id: 1,
      title: "Name",
      dataIndex: "busName"
    },
    {
      id: 2,
      title: "Number",
      dataIndex: "busNumber"
    },
    {
      id: 3,
      title: "From",
      dataIndex: "from"
    },
    {
      id: 4,
      title: "To",
      dataIndex: "to"
    },
    {
      id: 5,
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      id: 6,
      title: "Status",
      dataIndex: "status"
    },
    {
      id: 7,
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className='d-flex gap-3'>
          <i className="ri-delete-bin-5-line" style={{color:"red"}} onClick={() => {
            deleteBus(record._id)
          }}></i>
          <i className="ri-edit-box-line" onClick={() => {
            setSelectedBus(record);
            setShowBusForm(true);
          }}></i>
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <PageTitle title="Buses" />
        <button className='primary-btn' onClick={() => { setShowBusForm(true) }}>Add Bus</button>
      </div>

      <Table columns={columns} dataSource={buses} />

      {showBusForm && <BusForm showBusForm={showBusForm} setShowBusForm={setShowBusForm} type={selectedBus ? "edit" : "add"} selectedBus={selectedBus} getData={getBuses} setSelectedBus={setSelectedBus} />}
    </div>
  )
}

export default AdminBuses;
