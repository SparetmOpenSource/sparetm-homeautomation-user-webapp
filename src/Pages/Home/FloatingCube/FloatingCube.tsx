import './FloatingCube.css';

const FloatingCube = () => {
    return (
        <div className="cube-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 300 175"
                className="cube-svg"
            >
                <defs>
                    <g id="cube">
                        <path
                            fill="#333333"
                            stroke="#000000"
                            strokeWidth="0.5"
                            strokeLinejoin="bevel"
                            d="M-25.004,6.781L0.028,19.266V5.674L-25.004-6.811V6.781z"
                            pointerEvents="none"
                        />
                        <path
                            fill="#666666"
                            stroke="#000000"
                            strokeWidth="0.5"
                            strokeLinejoin="bevel"
                            d="M0.028,19.266L25.061,6.781h-0.057V-6.782L0.028,5.674V19.266z"
                            pointerEvents="none"
                        />
                        <path
                            fill="currentColor"
                            stroke="#000000"
                            strokeWidth="0.5"
                            strokeLinejoin="bevel"
                            d="M25.004-6.782l0.057-0.028L0.028-19.267L-25.004-6.811L0.028,5.674L25.004-6.782z"
                        />
                    </g>
                </defs>

                <g id="cubes" color="#CCCCCC" transform="translate(-180 0)">
                    {[
                        { x: 332.502, y: 52.9973 },
                        { x: 356.502, y: 64.9973 },
                        { x: 380.502, y: 76.9973 },
                        { x: 308.502, y: 64.9973 },
                        { x: 332.502, y: 76.9973 },
                        { x: 284.502, y: 76.9973 },
                        { x: 356.502, y: 88.9973 },
                        { x: 308.502, y: 88.9973 },
                        { x: 260.502, y: 88.9973 },
                        { x: 404.502, y: 88.9973 },
                        { x: 380.502, y: 100.9973 },
                        { x: 284.502, y: 100.9973 },
                        { x: 332.502, y: 100.9973 },
                        { x: 356.502, y: 112.9973 },
                        { x: 308.502, y: 112.9973 },
                        { x: 332.502, y: 124.9973 },
                    ].map(({ x, y }, i) => (
                        <use
                            key={i}
                            xlinkHref="#cube"
                            width="50.508"
                            height="38.98"
                            transform={`translate(${x} ${y})`}
                        >
                            <animate
                                attributeName="y"
                                begin="mouseover"
                                restart="whenNotActive"
                                dur="2s"
                                calcMode="spline"
                                keySplines="
                  0 .75 .5 1; .5 0 1 .25; 0 .25 .25 1;
                  .5 0 1 .5; 0 0 1 1; 0 0 1 1; 0 0 1 1;
                  0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1; 0 0 1 1"
                                values="0; -45; 0; 16; 0; -7; 0; 3; 0; -2; 0; 1; 0"
                                keyTimes="
                  0; 0.2564; 0.5128; 0.6154; 0.6923; 0.7436;
                  0.7949; 0.8462; 0.8974; 0.9231; 0.9487;
                  0.9744; 1"
                            />
                        </use>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default FloatingCube;
