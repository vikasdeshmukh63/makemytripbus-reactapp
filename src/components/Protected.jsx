import React, { useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {message} from "antd";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import DefaultLayout from './DefaultLayout';

function Protected({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
const {user} = useSelector(state =>state.users);
    const validateToken = async() => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/users/getuserbyid", {}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                dispatch(setUser(response.data.data))
            } else {
                localStorage.removeItem("token");
                message.error(response.data.message);
                navigate("/login");
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.removeItem("token");
            message.error(error.message);
            navigate("/login");
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            validateToken()
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            {user && (<DefaultLayout>{children}</DefaultLayout>)}
        </div>
    )
}

export default Protected
