import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const OrderPicker = (props) => (
  <Picker {...props}>
    <Picker.Item value="latest" label="Latest respositories" />
    <Picker.Item value="highest" label="Highest rated respositories"/>
    <Picker.Item value="lowest" label="Lowest rated respositories" />
  </Picker>
);

export const RepositoryListContainer = ({
  repositories,
  setChosenSort,
  chosenSort
}) => {
  return (
    <FlatList
      data={repositories}
      ListHeaderComponent={
        <OrderPicker selectedValue={chosenSort} onValueChange={setChosenSort} />
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem item={item} />
      )}
      keyExtractor={item => item.id}
      testID="repository-list"
    />
  );
};

const RepositoryList = () => {
  const [chosenSort, setChosenSort] = useState('latest');
  const { repositories, error, loading } = useRepositories(chosenSort);


  if (error) {
    console.error(error);
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      chosenSort={chosenSort}
      setChosenSort={setChosenSort}
    />
  );
};

export default RepositoryList;
