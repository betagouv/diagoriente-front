import React from 'react';
import ContentLoader from 'react-content-loader';

const FamillePlaceholder = () => (
  <ContentLoader height={475} width={400} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="0" y="70" rx="5" ry="5" width="300" height="200" />
  </ContentLoader>
);
export default FamillePlaceholder;
