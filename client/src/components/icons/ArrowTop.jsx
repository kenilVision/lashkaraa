import React from 'react'

const ArrowTop = ({ width = 14, height = 14, rotate180 = false }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 -4.5 20 20"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#ffffff"
            stroke="#ffffff"
            style={{
                transform: rotate180 ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease' // optional: adds smooth rotation
            }}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
                <title>{"arrow_up [#fffffffffff]"}</title>
                <desc>{"Created with Sketch."}</desc>
                <defs />
                <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth={1}
                    fill="none"
                    fillRule="evenodd"
                >
                    <g
                        id="Dribbble-Light-Preview"
                        transform="translate(-260.000000, -6684.000000)"
                        fill="#ffffff"
                    >
                        <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                                d="M223.707692,6534.63378 L223.707692,6534.63378 C224.097436,6534.22888 224.097436,6533.57338 223.707692,6533.16951 L215.444127,6524.60657 C214.66364,6523.79781 213.397472,6523.79781 212.616986,6524.60657 L204.29246,6533.23165 C203.906714,6533.6324 203.901717,6534.27962 204.282467,6534.68555 C204.671211,6535.10081 205.31179,6535.10495 205.70653,6534.69695 L213.323521,6526.80297 C213.714264,6526.39807 214.346848,6526.39807 214.737591,6526.80297 L222.294621,6534.63378 C222.684365,6535.03868 223.317949,6535.03868 223.707692,6534.63378"
                                id="arrow_up-[#fffffffffff]"
                            />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default ArrowTop