import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Valid = ({ color = '#7992BF', width, height }: Props) => {
  return (
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
        <g>
          <path
            fill={color}
            d="M24.8,35.8L24.8,35.8c0.7-0.7,0.7-1.9,0-2.6L18,26.4c-0.7-0.7-1.9-0.7-2.6,0l0,0c-0.7,0.7-0.7,1.9,0,2.6
			l6.8,6.8C23,36.5,24.1,36.5,24.8,35.8z"
          />
          <path
            fill={color}
            d="M38.6,19.5L38.6,19.5c-0.7-0.7-1.9-0.7-2.6,0L22.3,33.3c-0.7,0.7-0.7,1.9,0,2.6l0,0c0.7,0.7,1.9,0.7,2.6,0
			l13.7-13.7C39.3,21.4,39.3,20.2,38.6,19.5z"
          />
        </g>
      </g>
    </svg>
  );
};
export default Valid;
