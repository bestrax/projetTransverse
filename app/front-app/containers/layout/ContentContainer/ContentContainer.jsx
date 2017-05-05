import React, { PropTypes } from 'react';

const ContentContainer = ({ children }) => (
  <div id="content-wrap">
    {children}
  </div>
);

ContentContainer.propTypes = {
  children: PropTypes.node,
};

export default ContentContainer;
