import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Public({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/")
    }
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default Public
