import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  const handleFetchMore = (variables) => {
    console.log('end reached');
    const cantFetchMore = loading || !data?.repository.reviews.pageInfo.hasNextPage;

    if (cantFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      }
    });
  };

  return {
    repo: data && {
      ...data.repository,
      reviews: data.repository.reviews.edges.map((edge) => (
        edge.node
      )),
    },
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
