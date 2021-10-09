import React from 'react';
import { Picker } from '@react-native-picker/picker';

const OrderPicker = (props) => (
  <Picker {...props}>
    <Picker.Item value="latest" label="Latest respositories" />
    <Picker.Item value="highest" label="Highest rated respositories"/>
    <Picker.Item value="lowest" label="Lowest rated respositories" />
  </Picker>
);

export default OrderPicker;
