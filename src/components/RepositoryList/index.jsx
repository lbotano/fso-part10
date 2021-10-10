import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import RepositoryListHeader from './RepositoryListHeader';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;

    return (
      <RepositoryListHeader
        searchProps={{
          value: props.filter,
          onChangeText: props.setFilter,
        }}
        orderProps={{
          selectedValue: props.chosenSort,
          onValueChange: props.setChosenSort,
        }}
      />
    );
  };

  render() {
    const props = this.props;

    return (
      <FlatList
        data={this.props.repositories}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem item={item} />
        )}
        keyExtractor={item => item.id}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
        testID="repository-list"
      />
    );
  }
}

const RepositoryList = () => {
  const [filter, setFilter] = useState('');
  const [chosenSort, setChosenSort] = useState('latest');
  const { repositories, error, fetchMore } = useRepositories(filter, chosenSort);

  if (error) {
    console.error(error);
    return <Text>Error: {error.message}</Text>;
  }

  const onEndReach = () => {
    console.log('end reached');
    fetchMore();
    console.log(fetchMore);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      filter={filter}
      setFilter={setFilter}
      chosenSort={chosenSort}
      setChosenSort={setChosenSort}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
