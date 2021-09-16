import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import Text from './Text';
import Tag from './Tag';
import RepositoryItemStat from './RepositoryItemStat';

const classes = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  topSection: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  statList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={classes.container}>
      <View style={classes.topSection}>
        <View>
          <Image
            style={classes.avatar}
            source={{
            uri: item.ownerAvatarUrl
          }} />
        </View>
        <View style={classes.info}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Tag>
            {item.language}
          </Tag>
        </View>
      </View>
      <View style={classes.statList}>
        <RepositoryItemStat label="Stars" value={item.stargazersCount} />
        <RepositoryItemStat label="Forks" value={item.forksCount} />
        <RepositoryItemStat label="Reviews" value={item.reviewCount} />
        <RepositoryItemStat label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
  /*return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Fork: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );*/
};

export default RepositoryItem;
