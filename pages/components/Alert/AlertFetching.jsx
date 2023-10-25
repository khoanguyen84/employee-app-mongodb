import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";

function AlertFetching({ content }) {
    return (
        <div className="alert alert-success py-1 mb-1">
            <FaArrowsRotate size={25} className="text-white" />
            <div className="flex align-items-center">
                <span>{content || 'Loading'}</span>
                <span className="loading loading-dots loading-xs"></span>
            </div>
        </div>
    )
}
export default AlertFetching;