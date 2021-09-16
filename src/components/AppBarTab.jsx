import React from 'react';
import { Pressable } from 'react-native';

import Header from './Header';

const AppBarTab = () => {
  return (
    <Pressable>
      <Header>Repositories</Header>
    </Pressable>
  );
};

export default AppBarTab;
