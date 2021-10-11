import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import theme from '../theme';
import Text from './Text';

const classes = StyleSheet.create({
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

export default ReviewItem;
