import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Download = ({ color = '#7992BF', width, height }: Props) => {
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
      <path
        fill={color}
        d="M27,54C12.1,54,0,41.9,0,27S12.1,0,27,0s27,12.1,27,27S41.9,54,27,54z M27,4.4C14.5,4.4,4.4,14.5,4.4,27
	S14.5,49.7,27,49.7S49.7,39.5,49.7,27S39.5,4.4,27,4.4z"
      />
      <g>
        <path
          fill={color}
          d="M28.2,34.4L28.2,34.4c0.7-0.7,0.7-1.8,0-2.5l-6.5-6.5c-0.7-0.7-1.8-0.7-2.5,0l0,0c-0.7,0.7-0.7,1.8,0,2.5
		l6.5,6.5C26.4,35.1,27.5,35.1,28.2,34.4z"
        />
        <path
          fill={color}
          d="M25.8,34.4L25.8,34.4c0.7,0.7,1.8,0.7,2.5,0l6.5-6.5c0.7-0.7,0.7-1.8,0-2.5l0,0c-0.7-0.7-1.8-0.7-2.5,0
		L25.8,32C25.2,32.6,25.2,33.7,25.8,34.4z"
        />
        <path
          fill={color}
          d="M18.8,36.7L18.8,36.7c0,1,0.8,1.7,1.7,1.7h12.9c1,0,1.7-0.8,1.7-1.7l0,0c0-1-0.8-1.7-1.7-1.7H20.6
		C19.6,34.9,18.8,35.7,18.8,36.7z"
        />
        <path
          fill={color}
          d="M27,15.6L27,15.6c-1,0-1.7,0.8-1.7,1.7v15.8c0,1,0.8,1.7,1.7,1.7h0c1,0,1.7-0.8,1.7-1.7V17.4
		C28.7,16.4,27.9,15.6,27,15.6z"
        />
      </g>
    </svg>
  );
};
export default Download;
