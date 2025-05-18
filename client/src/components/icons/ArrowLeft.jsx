import React from 'react'

const ArrowLeft = ({ color = "#121212", width = 12, height = 20 }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M11 19.1411L1.98 10.1211L11 1.10111"
                stroke={color}
                strokeWidth={1.64}
            />
        </svg>
    )
}

export default ArrowLeft