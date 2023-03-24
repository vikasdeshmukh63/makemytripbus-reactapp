import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import axios from 'axios';
import { message, Row, Col, Input } from 'antd';
import Bus from "../components/Bus";

function Home() {
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);
  const [filters, setFilters] = useState({});


  const getBuses = async () => {
    const tempFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/buses/getallbuses", tempFilters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
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

  const clearFilters = () => {
    setFilters({
      from: "",
      to: "",
      journeyDate: ""
    });
  }

  useEffect(() => {
    getBuses()
  }, [filters]);

  return (
    <div>
      <div className='my-3 py-3'>
        <Row gutter={[10, 10]} align="center">
          <Col lg={6} sm={24}>
            <Input type='text'
              placeholder='From'
              value={filters.from}
              onChange={(e) => setFilters({ ...filters, from: e.target.value })} />
          </Col>
          <Col lg={6} sm={24}>
            <Input type='text'
              placeholder='To'
              value={filters.to}
              onChange={(e) => setFilters({ ...filters, to: e.target.value })} />
          </Col>
          <Col lg={6} sm={24}>
            <Input type='date'
              placeholder='Journey Date'
              value={filters.journeyDate}
              onChange={(e) => setFilters({ ...filters, journeyDate: e.target.value })} />
          </Col>
          <Col lg={6} sm={24}>
            <div style={{ display: "flex", justifyContent: "stretch", flexDirection: "column" }}>
              <button className='primary-btn' onClick={clearFilters}>Clear</button>
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row gutter={[10, 10]}>
          {buses.filter(item => item.status === "Yet To Start")
            .map((item, index) => {
              return <Col key={index} lg={12} xs={24} sm={24}>
                <Bus bus={item} />
              </Col>
            })}
        </Row>
      </div>
    </div>
  )
}

export default Home
