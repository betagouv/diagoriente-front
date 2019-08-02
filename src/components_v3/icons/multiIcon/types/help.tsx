import React from 'react';

interface Props {
  color?: string;
  height: string;
  width: string;
}

const Help = ({ color = '#7992BF', width, height }: Props) => {
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
        <path
          fill="#FFFFFF"
          d="M49.7,27c0,12.5-10.2,22.6-22.6,22.6C14.5,49.7,4.4,39.5,4.4,27C4.4,14.5,14.5,4.4,27,4.4
		C39.5,4.4,49.7,14.5,49.7,27z"
        />
        <path
          fill={color}
          d="M27,0C12.1,0,0,12.1,0,27s12.1,27,27,27c14.9,0,27-12.1,27-27S41.9,0,27,0z M27,49.7
		C14.5,49.7,4.4,39.5,4.4,27C4.4,14.5,14.5,4.4,27,4.4c12.5,0,22.6,10.2,22.6,22.6C49.7,39.5,39.5,49.7,27,49.7z"
        />
        <g>
          <g>
            <text
              transform="matrix(1 0 0 1 20.173 39.1049)"
              fill="#7992BF"
              font-family="'Nunito-Bold'"
              font-size="31.2717"
            >
              ?
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
};
export default Help;
