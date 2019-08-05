import React from 'react';
import { string } from 'prop-types';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Edit = ({ color = '#7992BF', width, height }: Props) => {
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
        <g>
          <circle fill="#FFFFFF" cx="27" cy="27" r="24.8" />
          <path
            fill={color}
            d="M27,54C12.1,54,0,41.9,0,27S12.1,0,27,0s27,12.1,27,27S41.9,54,27,54z M27,4.4C14.5,4.4,4.4,14.5,4.4,27
			S14.5,49.7,27,49.7S49.7,39.5,49.7,27S39.5,4.4,27,4.4z"
          />
        </g>
        <path
          fill={color}
          d="M36.6,17.5c-1.7-1.7-4.3-1.7-6,0L19.7,28.4l0,0l-1.7,1.7c-0.1,0.1-0.2,0.2-0.2,0.4l-1.4,5.8
		c-0.1,0.3,0,0.6,0.2,0.8l0.5,0.5c0.2,0.2,0.5,0.3,0.8,0.2l5.8-1.4c0.1,0,0.3-0.1,0.4-0.2l1.7-1.7l0,0l10.9-10.9
		C38.2,21.8,38.2,19.1,36.6,17.5z M21.1,36l-2.3,0.6l-1.4-1.4l0.6-2.3c0.1-0.3,0.4-0.3,0.6-0.2l2.7,2.7C21.5,35.7,21.4,36,21.1,36z
		 M35.9,22.7L25.5,33.1l-0.6,0.6c-0.4,0.4-1,0.4-1.3,0l-0.1-0.1c-0.4-0.4-0.4-1,0-1.3l0.6-0.6l10.4-10.4c0.4-0.4,1-0.4,1.3,0
		l0.1,0.1C36.3,21.7,36.3,22.3,35.9,22.7z"
        />
      </g>
    </svg>
  );
};
export default Edit;