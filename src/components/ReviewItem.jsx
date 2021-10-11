import React from 'react';
import { View, Pressable, Alert, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-native';
import { format } from 'date-fns';

import theme from '../theme';
import Text from './Text';
import Header from './Header';
import { DELETE_REVIEW } from '../graphql/mutations';

const classes = StyleSheet.create({
  reviewItem: {
    backgroundColor: theme.colors.white,
    marginTop: 10,
    padding: 10,
  },
  reviewItemTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 3,
    flexGrow: 1,
  },
  viewButton: {
    marginRight: 5,
  },
  deleteButton: {
    marginLeft: 5,
    backgroundColor: theme.colors.error,
  }
});

const ReviewItem = ({ review, showOptions, refetch }) => {
  const [deleteReviewMutation, { loading, error }] = useMutation(DELETE_REVIEW, {
    variables: {
      id: review.id,
    },
  });

  const deleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReviewMutation();
            refetch();
          },
        }
      ],
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    console.error('Error: ', error);
    return <Text color="error">Error: {error.message}</Text>;
  }

  return (
    <View style={classes.reviewItem}>
      <View style={classes.reviewItemTop}>
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
      { showOptions && (
          <View style={classes.buttons}>
            <Link
              to={`/repository/${review.repositoryId}`}
              style={[classes.button, classes.viewButton]}
            >
              <Header>View repository</Header>
            </Link>
            <Pressable
              onPress={deleteReview}
              style={[classes.button, classes.deleteButton]}
            >
              <Header>Delete review</Header>
            </Pressable>
          </View>
        )
      }
    </View>
  );
};

export default ReviewItem;
