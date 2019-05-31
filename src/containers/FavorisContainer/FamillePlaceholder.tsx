import React from 'react';
import ContentLoader from 'react-content-loader';

const FamillePlaceholder = () => (
  <ContentLoader
    height={350}
    width={400}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    /*     style={{ width: '97%', height: '100%' }}
     */
  >
    <rect x="0" y="70" rx="5" ry="5" width="100%" /* height="100%" */ />
  </ContentLoader>
);
export default FamillePlaceholder;
