import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

export function AlertSuccess({ content }) {
    const [show, setShow] = useState(true)
    useEffect(() => {
        const timerId = setTimeout(() => {
            setShow(false)
        }, 3000)
        return () => {
            clearTimeout(timerId)
        }
    })
    return (
        <>
            {
                show && (
                    <div className="alert alert-success py-1 my-1">
                        <FaCircleCheck size={25} className="text-white" />
                        <span>{content || 'Success'}</span>
                    </div>
                )
            }
        </>
    )
}