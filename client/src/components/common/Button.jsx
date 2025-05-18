import React from 'react'

const Button = ({ children, type = "button", className, ...rest }) => {
    return (
        <button type={type} {...rest} className={`px-6 py-2 border cursor-pointer rounded-lg ${className}`}>
            {children}
        </button>
    )
}

export default Button;