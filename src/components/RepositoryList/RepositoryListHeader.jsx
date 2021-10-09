import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import OrderPicker from './OrderPicker';

const RepositoryListHeader = ({ searchProps, orderProps }) => (
  <View>
    <Searchbar
      placeholder="Search"
      {...searchProps}
    />
    <OrderPicker {...orderProps} />
  </View>
);

export default RepositoryListHeader;
