import { useQuery } from '@apollo/client';

import { GET_USER_REVIEWS } from '../graphql/queries';

const useUserReviews = () => {
  const { data, loading, error, refetch, fetchMore, ...result } = useQuery(GET_USER_REVIEWS, {
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = (variables) => {
    const cantFetchMore = loading || !data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (cantFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const reviews = data
    ? data.authorizedUser.reviews.edges.map(edge => edge.node)
    : [];

  return {
    data: reviews,
    loading,
    error,
    refetch,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useUserReviews;
