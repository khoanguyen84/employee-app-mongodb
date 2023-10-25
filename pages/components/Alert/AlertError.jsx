import React from "react";
import { FaCircleXmark} from "react-icons/fa6";
function AlertError({ content }) {
    return (
        <div className="alert alert-error py-1 mb-1">
            <FaCircleXmark size={25} className="text-white" />
            <span>{content || 'Something went wrong, please try again!'}</span>
        </div>
    )
}
export default AlertError;