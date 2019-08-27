import React from 'react';

import classes from './video.module.scss';

interface IProps {
  link?: string;
}

const VideoContainer = ({ link }: IProps) => (
  <div className={classes.container}>
    <iframe
      className={classes.video}
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      title="job"
    />
  </div>
);

export default VideoContainer;
