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

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
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
  const { repositories, error, loading } = useRepositories();

  if (error) {
    console.log(error);
    return <Text>Error: {error.message}</Text>;
  }
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;
