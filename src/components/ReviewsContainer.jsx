import React from 'react';
import { FlatList } from 'react-native';

import ReviewItem from './ReviewItem';

const ReviewsContainer = ({
  reviews,
  header,
  fetchMore,
  showOptions,
  refetch,
}) => {
  return (
    <FlatList
      data={reviews}
      renderItem={
        ({ item }) =>
          <ReviewItem
            review={item}
            showOptions={showOptions}
            refetch={refetch}
          />
      }
      keyExtractor={({ id }) => id}
      ListHeaderComponent={header}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ReviewsContainer;
