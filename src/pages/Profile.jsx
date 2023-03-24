import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../components/PageTitle';
import ProfilePopUp from '../components/ProfilePopUp';
import { message } from 'antd';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import LoginPopUp from '../components/LoginPopUp';
import PasswordPopUp from '../components/PasswordPopUp';


function Profile() {
    const dispatch = useDispatch();
    const [showPopUp1, setShowPopUp1] = useState(false);
    const [profileInfo, setProfileInfo] = useState([]);
    const [showPopUp2, setShowPopUp2] = useState(false)
    const [showPopUp3, setShowPopUp3] = useState(false)

    const getProfile = async () => {
        try {
            dispatch(showLoading());
            const response = await axiosInstance.post("/api/users/getprofilebyid", {});
            dispatch(hideLoading());
            if (response.data.success) {
                setProfileInfo(response.data.data);
                message.success(response.data.message);
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div>
            <div className="d-flex justufy-content-between my-3">
                <PageTitle title="Profile" />
            </div>
            <div className='card-2 p-3 mt-3'>
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between flex-column">
                        <h1 className='text-xl fw-semibold primary-text'>Profile</h1>
                        <h4 className='text-lg text-secondary'>Basic info, for a faster booking experience</h4>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                        <button className='primary-btn' onClick={() => { setShowPopUp1(true) }}>Edit</button>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between flex-column">
                    <p className='text-md'><span className='fw-semibold'>User Name :</span> {profileInfo.name}</p>
                    <hr />
                    <p className='text-md'><span className='fw-semibold'>Birthday :</span> {profileInfo.birthday}</p>
                    <hr />
                    <p className='text-md'><span className='fw-semibold'>Gender :</span> {profileInfo.gender}</p>
                    <hr />
                    <p className='text-md'><span className='fw-semibold'>Marital Status :</span>  {profileInfo.maritalStatus}</p>
                </div>
                {showPopUp1 && <ProfilePopUp showPopUp1={showPopUp1} setShowPopUp1={setShowPopUp1} profileInfo={profileInfo} getProfile={getProfile}/>}
            </div>
            <div className="card-2 p-3 mt-3">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between flex-column">
                        <h1 className='text-xl fw-semibold primary-text'>Login Details</h1>
                        <h4 className='text-lg text-secondary'>Manage your email address mobile number</h4>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                        <button className='primary-btn' onClick={() => { setShowPopUp2(true) }}>Edit</button>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between flex-column">
                    <p className='text-md'><span className='fw-semibold'>Mobile Number :</span> {profileInfo.mobile}</p>
                    <hr />
                    <p className='text-md'><span className='fw-semibold'>Email ID :</span> {profileInfo.email}</p>
                </div>
                {showPopUp2 && <LoginPopUp showPopUp2={showPopUp2} setShowPopUp2={setShowPopUp2} profileInfo={profileInfo} getProfile={getProfile}/>}
            </div>
            <div className='card-2 p-3 mt-3'>
            <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between flex-column">
                        <h1 className='text-xl fw-semibold primary-text'>Password Change</h1>
                        <h4 className='text-lg text-secondary'>Manage your password</h4>
                    </div>
                    <div className="d-flex justify-content-start flex-column">
                        <button className='primary-btn' onClick={() => { setShowPopUp3(true) }}>Edit</button>
                    </div>
                </div>
                <hr />
                {showPopUp3 && <PasswordPopUp showPopUp3={showPopUp3} setShowPopUp3={setShowPopUp3}/>}
            </div>
        </div>
    )
}

export default Profile
