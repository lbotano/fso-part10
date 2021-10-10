import React, { useState } from 'react';
import { View, Image, Pressable, StyleSheet, Linking, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import theme from '../../theme';
import Text from '../Text';
import Tag from '../RepositoryList/Tag';
import RepositoryItemStat from '../RepositoryList/RepositoryItemStat';
import Header from '../Header';
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
  reviewItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    marginTop: 10,
    padding: 10
  },
  reviewRating: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
  },
  reviewInfo: {
    paddingLeft: 10,
    flexGrow: 1,
  },
  reviewTextContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  reviewText: {
    flex: 1,
    flexWrap: 'wrap',
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

const ReviewItem = ({ review }) => (
  <View style={classes.reviewItem}>
    <View style={classes.reviewRating}>
      <Text
        color="primary"
        fontWeight="bold"
        fontSize="subheading"
      >
        {review.rating}
      </Text>
    </View>
    <View style={classes.reviewInfo}>
      <Text fontWeight="bold">{review.user.username}</Text>
      <Text color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
      <View style={classes.reviewTextContainer}>
        <Text style={classes.reviewText}>{review.text}</Text>
      </View>
    </View>
  </View>
);

const SingleRepositoryContainer = (props) => {
  return (
    <FlatList
      data={ props.repo.reviews }
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={props.repo} />}
      onEndReached={props.fetchMore}
      onEndReachedThreshold={0.5}
    />
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
    <SingleRepositoryContainer repo={repo} fetchMore={fetchMore} />
  );

};

export default SingleRepository;
