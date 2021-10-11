import React from 'react';
import { FlatList } from 'react-native';

import ReviewItem from './ReviewItem';

const ReviewsContainer = ({ reviews, header, fetchMore }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={header}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ReviewsContainer;
