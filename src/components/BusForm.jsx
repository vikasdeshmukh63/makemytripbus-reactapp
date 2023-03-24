import React from 'react';
import { Modal, Row, Form, Col, Input, Select, message } from 'antd';
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../helpers/axiosInstance';
import { showLoading, hideLoading } from "../redux/alertsSlice";

function BusForm({ showBusForm, setShowBusForm, type = "add", getData, selectedBus, setSelectedBus }) {
    const { Option } = Select;

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading())
            let response = null;
            if (type === "add") {
                response = await axiosInstance.post("/api/buses/addbus", values);
            } else {
                response = await axiosInstance.post("/api/buses/updatebus", {
                    ...values,
                    _id: selectedBus._id
                })
            }
            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message)
            }
            getData()
            setShowBusForm(false);
            setSelectedBus(null);
            dispatch(hideLoading());
        } catch (error) {
            message.error(error.message);
            dispatch(hideLoading());
        }
    }
    return (
        <div>
            <Modal title={type === "add" ? "Add Bus" : "Update Bus"}
                open={showBusForm}
                onCancel={() => {
                    setShowBusForm(false)
                    setSelectedBus(null)
                }} footer={null} width={900}>

                <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
                    <Row gutter={[10, 10]}>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Bus Name" name="busName">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Bus Number" name="busNumber">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Capacity" name="capacity">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="From" name="from">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="To" name="to">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Journey Date" name="journeyDate">
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Departure" name="departure">
                                <Input type="time" />
                            </Form.Item>
                        </Col>
                        <Col lg={8} xs={24}>
                            <Form.Item label="Arrival" name="arrival">
                                <Input type="time" />
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Bus Type" name="busType">
                                <Select placeholder="Select Bus Type" allowClear>
                                    <Option value="ac">AC</Option>
                                    <Option value="non-ac">Non-AC</Option>
                                    <Option value="sleeper">Sleeper</Option>
                                    <Option value="semi-sleeper">Semi-Sleeper</Option>
                                    <Option value="seater">Seater</Option>
                                    <Option value="volvo">Volvo</Option>
                                    <Option value="luxury">Luxury</Option>
                                    <Option value="mini">Mini</Option>
                                    <Option value="express">Express</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Form.Item label="Fare" name="fare">
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Status" name="status">
                                <Select placeholder="Select Bus Status" allowClear>
                                    <Option value="Yet To Start">Yet To Start</Option>
                                    <Option value="Running">Running</Option>
                                    <Option value="Completed">Completed</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button type='submit' className='primary-btn'>Save</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default BusForm
