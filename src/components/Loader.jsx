import React, { useState } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";


function Loader() {

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"transparent",
            zIndex:"100"
        }}>
            <div className="sweet-loading" style={{background:"transparent"}}>
                <ScaleLoader
                    color='red'
                    loading={true}
                    css=''
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader
