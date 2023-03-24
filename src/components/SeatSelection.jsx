import React from 'react';
import { Row, Col } from 'antd';
import "../resources/bus.css";

function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {

    const busCapacity = bus.capacity;

    const toggleSeatSelect = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((item) => {
                return item !== seatNumber
            }));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber])
        }
    }


    return (
        <div className='mx-5'>
            <div className="bus-container">
                <Row gutter={[10, 10]}>
                    {Array.from(Array(busCapacity).keys()).map((item, index) => {
                        let seatClass = "";
                        if (selectedSeats.includes(item + 1)) {
                            seatClass = "selected-seat"
                        }else if(bus.seatsBooked.includes(item + 1)){
                            seatClass = "booked-seat";
                        }

                        return (<Col span={6} key={index}>
                            <div className={`seat ${seatClass}`} onClick={() => { toggleSeatSelect(item + 1) }}>
                                {item + 1}
                            </div>
                        </Col>)
                    })}
                </Row>
            </div>
        </div>
    )
}

export default SeatSelection
