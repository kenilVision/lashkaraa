import React from 'react'

const Facebook = ({ size = 28, ...rest }) => {
    return (
        <svg
            width={15}
            height={28}
            viewBox="0 0 15 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                d="M10.0598 15.8273H13.5005L14.8768 10.3222H10.0598V7.56958C10.0598 6.15201 10.0598 4.81701 12.8124 4.81701H14.8768V0.19268C14.4281 0.1335 12.7339 0 10.9448 0C7.20813 0 4.55465 2.28051 4.55465 6.46855V10.3222H0.425781V15.8273H4.55465V27.5258H10.0598V15.8273Z"
                fill="white"
            />
        </svg>
    )
}

export default Facebook