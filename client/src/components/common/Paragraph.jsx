import React from 'react'

const Paragraph = ({ children, className }) => {
    return (
        <p className={`${className} text-[13px] text-primary`}>{children}</p>
    )
}

export default Paragraph;
