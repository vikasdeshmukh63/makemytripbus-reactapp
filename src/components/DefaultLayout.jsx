import React, { useState } from 'react';
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import logo from "../data/logo.png";
import logo2 from "../data/logo2.png";

function DefaultLayout({ children }) {
    const navigate = useNavigate();

    const {user} = useSelector(state => state.users)

    const [collapsed,setCollapsed]=useState(false);

    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-3-line"
        },
        {
            name: "Bookings",
            path: "/bookings",
            icon: "ri-file-list-2-line"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-3-line"
        },
        {
            name: "Logout",
            path: "/logout",
            icon: "ri-logout-box-r-line"
        }
    ]
    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-3-line"
        },
        {
            name: "Buses",
            path: "/admin/buses",
            icon: "ri-bus-line"
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "ri-folder-user-fill"
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-3-line"
        },
        {
            name: "Bookings",
            path: "/admin/bookings",
            icon: "ri-file-list-2-line"
        },
        {
            name: "Logout",
            path: "/logout",
            icon: "ri-logout-box-r-line"
        }
    ]
    const menuToBeRender = user?.isAdmin ? adminMenu : userMenu;
    let activeRoute = window.location.pathname;
    if(window.location.pathname.includes("booknow")){
        activeRoute = "/"
    }
    return (
        <div className='layout-parent' style={{position:"fixed",top:"0",left:"0"}}>
            <div className="sidebar">
                <div className="sidebar-header">
                        {collapsed ? (<img src={logo2} alt="logo" className='logo2'/>) : (<img src={logo} alt="logo" className='logo'/>)}
                        <h1 className='name'>{user?.name.split(" ")[0]}</h1>
                        <h1 className='role'>{user?.isAdmin ? "Admin" : "User"}</h1>
                </div>
                <div className='d-flex flex-column gap-4 justify-content-start menu'>
                    {menuToBeRender.map((item, index) => {
                        return <div key={index} className={`menu-item ${activeRoute===item.path && "active"}`} onClick={()=>{
                            if(item.path === "/logout"){
                                localStorage.removeItem("token");
                                navigate("/login");
                            }else{
                                navigate(item.path)
                            }
                        }}>
                            <i className={item.icon}></i>
                            {!collapsed && <span>{item.name}</span>}
                        </div>
                    })}
                </div>
            </div>
            <div className="body">
                <div className="header">
                    {collapsed ? <i className="ri-menu-3-line" onClick={()=>{setCollapsed(!collapsed)}}></i> : <i className="ri-close-fill" onClick={()=>{setCollapsed(!collapsed)}}></i>}
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout
