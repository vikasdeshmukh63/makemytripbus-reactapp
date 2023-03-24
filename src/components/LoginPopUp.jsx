import React from 'react'
import { Modal, Form, Col, Input, Row, message } from 'antd'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import { axiosInstance } from '../helpers/axiosInstance';


function LoginPopUp({ showPopUp2, setShowPopUp2, profileInfo,getProfile}) {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post("/api/users/updateprofilebyid", values);
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                getProfile()
            } else {
                message.success(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading);
            message.error(error.message);
        }
    }
    
    return (
        <div>
            <Modal title={"Edit"}
                open={showPopUp2}
                onCancel={() => {
                    setShowPopUp2(false)
                }}
                footer={null}
                width={500}
            >
                <Form layout='vertical' onFinish={onFinish} initialValues={profileInfo}>
                    <Row>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Mobile Number" name="mobile">
                                <Input type="Number" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Email ID" name="email">
                                <Input type="text" />
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
