import React from 'react'
import { Modal, Form, Col, Input, Row, Select,message } from 'antd'
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';

function ProfilePopUp({ showPopUp1, setShowPopUp1,profileInfo,getProfile }) {
    const { Option } = Select;
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
                open={showPopUp1}
                onCancel={() => {
                    setShowPopUp1(false)
                }}
                footer={null}
                width={500}
            >
                <Form layout='vertical' onFinish={onFinish} initialValues={profileInfo}>
                    <Row>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Name" name="name">
                                <Input type="text" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Birthday" name="birthday">
                                <Input type="date" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Gender" name="gender">
                                <Select placeholder="Select Gender" allowClear>
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Transgender">Transgender</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Marital Status" name="maritalStatus">
                            <Select placeholder="Marital Status" allowClear>
                                    <Option value="Single">Single</Option>
                                    <Option value="Married">Married</Option>
                                    <Option value="Divorced">Divorced</Option>
                                </Select>
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

export default ProfilePopUp
