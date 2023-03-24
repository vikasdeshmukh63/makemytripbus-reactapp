import React from 'react';
import { Form, Input, message } from 'antd';
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import "../resources/auth.css"



function Login() {
    // const navigate = useNavigate();

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/users/login", values)
            dispatch(hideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token", response.data.data);
                // navigate("/");
                window.location.href = "/";
            } else {
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
                <h1 className='text-lg'>MMT - Login</h1>
                <hr />
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label="Email" name="email">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to="/register">
                            Click here to Register
                        </Link>
                        <button className="secondary-btn" type='submit'>Login</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
