'use client'
import React, { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";

export default function AlertError({ content }) {
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
                    <div className="alert alert-error py-1 mb-1">
                        <FaCircleXmark size={25} className="text-white" />
                        <span>{content || 'Something went wrong, please try again!'}</span>
                    </div>)
            }
        </>
    )
}