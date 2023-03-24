import React from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async(values)=>{
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/users/register",values);
dispatch(hideLoading());
            if(response.data.success){
                message.success(response.data.message);
                navigate("/login");
            }else{
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    }


    return (
        <div className='h-screen d-flex justify-content-center align-items-center'>
            <div className="w-400 card-1 p-3">
                <h1 className='text-lg'>MMT - Register</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Name" name="name">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/login">
                            Click here to Login
                        </Link>
                        <button className="secondary-btn" type='submit'>Register</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Register
