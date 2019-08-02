import React from 'react';
import classes from './next.module.scss';

interface Props {
  color?: string;
  height: string;
  width: string;
  withBorder?: boolean;
}

const Next = ({ color = '#7992BF', width, height, withBorder }: Props) => {
  return (
    <div className={classes.circle} style={withBorder ? { borderColor: color } : { borderColor: 'transparent' }}>
      <svg
        fill={color}
        id="Capa_1"
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 14.9 23"
        enableBackground="new 0 0 14.9 23"
      >
        <g>
          <g>
            <g>
              <path
                fill={color}
                d="M0.7,4.1l7.4,7.4l-7.4,7.4C0.2,19.3,0,20,0,20.6c0,0.6,0.2,1.2,0.7,1.7c1,0.9,2.5,0.9,3.4,0l7.4-7.4
				l3.4-3.4l-3.4-3.4L4.1,0.7C3.7,0.2,3,0,2.4,0C1.8,0,1.2,0.2,0.7,0.7C-0.2,1.6-0.2,3.2,0.7,4.1z"
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};
export default Next;
