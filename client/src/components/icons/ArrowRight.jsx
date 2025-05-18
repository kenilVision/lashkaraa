import React from 'react'

const ArrowRight = ({ color = "#121212", width = 12, height = 20 }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.97998 0.623535L9.99998 9.64354L0.97998 18.6635"
                stroke={color}
                strokeWidth={1.64}
            />
        </svg>
    )
}

export default ArrowRight