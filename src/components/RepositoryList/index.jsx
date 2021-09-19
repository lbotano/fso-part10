import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories();

  if (error) {
    console.log(error);
    return <Text>Error: {error.message}</Text>;
  }
  if (loading) {
    console.log(loading);
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;
