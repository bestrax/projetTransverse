import React, { PropTypes } from 'react';

import NavBarContainer from '../NavBarContainer';
import ContentContainer from '../ContentContainer';
import FooterContainer from '../FooterContainer';

const MainContainer = ({ children }) => (
  <div id="mainContainer">
    <NavBarContainer />

    <ContentContainer>
      {children}
    </ContentContainer>

    <FooterContainer />
  </div>
);

MainContainer.propTypes = {
  children: PropTypes.node,
};

export default MainContainer;
