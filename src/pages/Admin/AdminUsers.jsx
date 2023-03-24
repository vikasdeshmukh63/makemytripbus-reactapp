import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import PageTitle from '../../components/PageTitle'
import { axiosInstance } from '../../helpers/axiosInstance';
import { hideLoading, showLoading } from '../../redux/alertsSlice';


function AdminUsers() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/users/getallusers", {});
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message);
    }
  }

  const updateUsersPermissions = async (user, action) => {
    try {
      let payload = null;
      if(action === "make-admin"){
        payload ={
          ...user,
          isAdmin:true
        };
      }else if(action === "remove-admin"){
        payload = {
          ...user,
          isAdmin:false
        }
      }else if(action === "block"){
        payload = {
          ...user,
          isBlocked:true
        }
      }else if(action === "unblock"){
        payload={
          ...user,
          isBlocked:false
        }
      }
      dispatch(showLoading());
      const response = await axiosInstance.post("/api/users/updateuser", payload);
      dispatch(hideLoading());
      if (response.data.success) {
        getUsers();
        message.success(response.data.message);
      } else {
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: 1
    },
    {
      title: "Email",
      dataIndex: "email",
      key: 2
    },
    {
      title:"Status",
      dataIndex:"",
      render:(data)=>{
        return data.isBlocked ? "Blocked" : "Active"
      }
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data?.isAdmin) {
          return "Admin";
        } else {
          return "User"
        }
      },
      key: 3
    }, {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className='d-flex gap-3'>
          {record?.isBlocked ? <p className='underlined' style={{color:"green"}} onClick={()=>{updateUsersPermissions(record,"unblock")}}>UnBlock</p> : <p className='underlined' style={{color:"red"}} onClick={()=>{updateUsersPermissions(record,"block")}}>Block</p>}
          {record?.isAdmin ? <p className='underlined' style={{color:"red"}} onClick={()=>{updateUsersPermissions(record,"remove-admin")}}>Remove Admin</p> : <p className='underlined' style={{color:"green"}} onClick={()=>{updateUsersPermissions(record,"make-admin")}}>Make Admin</p>}

        </div>
      ),
      key: 4
    }
  ]

  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <PageTitle title="Users" />
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default AdminUsers
