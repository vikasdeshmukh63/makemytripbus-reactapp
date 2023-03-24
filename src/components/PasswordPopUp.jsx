import React from 'react'
import { Modal, Form, Col, Input, Row, message } from 'antd'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import {useNavigate} from "react-router-dom"

function LoginPopUp({ showPopUp3, setShowPopUp3 }) {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post("/api/users/changepassword", values)
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading);
            message.error(error.message);
        }
    }
    return (
        <div>
            <Modal title={"Edit"}
                open={showPopUp3}
                onCancel={() => {
                    setShowPopUp3(false)
                }}
                footer={null}
                width={500}
            >
                <Form layout='vertical' onFinish={onFinish}>
                    <Row>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Old Password" name="oldPassword">
                                <Input type="password" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="New Password" name="newPassword">
                                <Input type="password" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Confirm New Password" name="cnfPassword">
                                <Input type="password" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className='primary-btn'>Submit</button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default LoginPopUp
