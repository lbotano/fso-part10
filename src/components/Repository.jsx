import React from 'react';
import { View, Image, Pressable, StyleSheet, Linking } from 'react-native';
import { useParams } from 'react-router-native';

import theme from '../theme';
import Text from './Text';
import Tag from './RepositoryList/Tag';
import RepositoryItemStat from './RepositoryList/RepositoryItemStat';
import Header from './Header';
import useRepository from '../hooks/useRepository';

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
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop: 10,
    backgroundColor: theme.colors.primary,
  },
});

const Repository = () => {
  const { id } = useParams();
  const { repo, error, loading } = useRepository(id);

  if (error) {
    console.error(error);
    return (
      <Text>Error: {error.message}</Text>
    );
  }

  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  const openInGithub = () => {
    Linking.openURL(repo.url);
    console.log('pushing', repo.url);
  };

  return (
    <View style={classes.container}>
      <View style={classes.topSection}>
        <View>
          <Image
            style={classes.avatar}
            source={{
            uri: repo.ownerAvatarUrl
          }} />
        </View>
        <View style={classes.info}>
          <Text fontWeight="bold" testID="repo-name">{repo.fullName}</Text>
          <Text testID="repo-description">{repo.description}</Text>
          <Tag testID="repo-language">
            {repo.language}
          </Tag>
        </View>
      </View>
      <View style={classes.statList}>
        <RepositoryItemStat label="Stars" value={repo.stargazersCount} />
        <RepositoryItemStat label="Forks" value={repo.forksCount} />
        <RepositoryItemStat label="Reviews" value={repo.reviewCount} />
        <RepositoryItemStat label="Rating" value={repo.ratingAverage} />
      </View>
      <Pressable style={classes.button} onPress={openInGithub}>
        <Header>Open in GitHub</Header>
      </Pressable>
    </View>
  );
};

export default Repository;
