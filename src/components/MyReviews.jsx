import React, { useState } from 'react';

import Text from './Text';
import ReviewsContainer from './ReviewsContainer';
import useUserReviews from '../hooks/useUserReviews';

const MyReviews = () => {
  const { data, loading, error, fetchMore } = useUserReviews();

  const [everLoaded, setEverLoaded] = useState(false);

  if (!everLoaded) {
    if (loading) {
      return <Text>Loading...</Text>;
    }
    setEverLoaded(true);
  }

  if (error) {
    console.error('Error: ', error.message);
    return <Text color="error">Error: {error.message}</Text>;
  }

  return (
    <ReviewsContainer 
      reviews={data}
      fetchMore={fetchMore}
    />
  );
};

export default MyReviews;
