import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Connect = ({ color = '#FAB82D', width, height }: Props) => (
  <svg
    fill={color}
    id="Capa_1"
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0 0 54 54"
    enableBackground="new 0 0 54 54"
  >
    <g>
      <circle fill="#FFFFFF" cx="27" cy="27" r="24.8" />
      <path
        fill={color}
        d="M27,54C12.1,54,0,41.9,0,27S12.1,0,27,0s27,12.1,27,27S41.9,54,27,54z M27,4.4C14.5,4.4,4.4,14.5,4.4,27
		S14.5,49.7,27,49.7S49.7,39.5,49.7,27S39.5,4.4,27,4.4z"
      />
    </g>
    <g>
      <path
        fill={color}
        d="M34.4,25.8L34.4,25.8c-0.7-0.7-1.8-0.7-2.5,0l-6.5,6.5c-0.7,0.7-0.7,1.8,0,2.5h0c0.7,0.7,1.8,0.7,2.5,0
		l6.5-6.5C35.1,27.6,35.1,26.5,34.4,25.8z"
      />
      <path
        fill={color}
        d="M34.4,28.2L34.4,28.2c0.7-0.7,0.7-1.8,0-2.5l-6.5-6.5c-0.7-0.7-1.8-0.7-2.5,0l0,0c-0.7,0.7-0.7,1.8,0,2.5
		l6.5,6.5C32.6,28.9,33.7,28.9,34.4,28.2z"
      />
      <path
        fill={color}
        d="M36.7,35.2L36.7,35.2c1,0,1.7-0.8,1.7-1.7V20.6c0-1-0.8-1.7-1.7-1.7l0,0c-1,0-1.7,0.8-1.7,1.7v12.9
		C34.9,34.5,35.7,35.2,36.7,35.2z"
      />
      <path
        fill={color}
        d="M15.6,27.1L15.6,27.1c0,1,0.8,1.7,1.7,1.7h15.8c1,0,1.7-0.8,1.7-1.7v0c0-1-0.8-1.7-1.7-1.7H17.4
		C16.4,25.3,15.6,26.1,15.6,27.1z"
      />
    </g>
  </svg>
  );
export default Connect;
