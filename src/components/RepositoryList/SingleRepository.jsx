import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Linking, FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import theme from '../../theme';
import Text from '../Text';
import Tag from '../RepositoryList/Tag';
import RepositoryItemStat from '../RepositoryList/RepositoryItemStat';
import Header from '../Header';
import ReviewsContainer from '../ReviewsContainer';
import useRepository from '../../hooks/useRepository';

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

const RepositoryInfo = ({ repository }) => {
  const openInGithub = () => {
    Linking.openURL(repository.url);
    console.log('pushing', repository.url);
  };

  return (
    <View style={classes.container}>
      <View style={classes.topSection}>
        <View>
          <Image
            style={classes.avatar}
            source={{
            uri: repository.ownerAvatarUrl
          }} />
        </View>
        <View style={classes.info}>
          <Text fontWeight="bold" testID="repo-name">{repository.fullName}</Text>
          <Text testID="repo-description">{repository.description}</Text>
          <Tag testID="repo-language">
            {repository.language}
          </Tag>
        </View>
      </View>
      <View style={classes.statList}>
        <RepositoryItemStat label="Stars" value={repository.stargazersCount} />
        <RepositoryItemStat label="Forks" value={repository.forksCount} />
        <RepositoryItemStat label="Reviews" value={repository.reviewCount} />
        <RepositoryItemStat label="Rating" value={repository.ratingAverage} />
      </View>
      <Pressable style={classes.button} onPress={openInGithub}>
        <Header>Open in GitHub</Header>
      </Pressable>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repo, error, loading, fetchMore } = useRepository(id);

  const [everLoaded, setEverLoaded] = useState(false);

  if (!loading && !everLoaded) {
    setEverLoaded(true);
  }

  if (!everLoaded) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.error(error);
    return (
      <Text>Error: {error.message}</Text>
    );
  }

  return (
    <ReviewsContainer
      reviews={repo.reviews}
      fetchMore={fetchMore}
      header={() => <RepositoryInfo repository={repo} />}
    />
  );

};

export default SingleRepository;
