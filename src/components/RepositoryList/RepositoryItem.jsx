import React from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import theme from '../../theme';
import Text from '../Text';
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
  const history = useHistory();

  const goToRepo = () => {
    history.push(`/repository/${item.id}`);
  };

  return (
    <Pressable onPress={goToRepo}>
      <View style={classes.container}>
        <View style={classes.topSection}>
          <View>
            <Image
              style={classes.avatar}
              source={{
                uri: item.ownerAvatarUrl
              }}
            />
          </View>
          <View style={classes.info}>
            <Text fontWeight="bold" testID="repo-name">{item.fullName}</Text>
            <Text testID="repo-description">{item.description}</Text>
            <Tag testID="repo-language">
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
    </Pressable>
  );
};

export default RepositoryItem;
