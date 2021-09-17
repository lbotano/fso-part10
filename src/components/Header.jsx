import React from 'react';

import Text from './Text';

const Header = ({ ...props }) => {
  return <Text
    color="white"
    fontSize="subheading"
    fontWeight="bold"
    {...props}
  />;
};

export default Header;
