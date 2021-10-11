import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (filter, chosenSort) => {
  let orderBy = 'CREATED_AT';
  let orderDirection = 'ASC';

  switch (chosenSort) {
    case 'highest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'lowest':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
  }

  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      filter,
      orderBy,
      orderDirection,
    },
  });

  const handleFetchMore = (variables) => {
    const cantFetchMore = loading || !data?.repositories.pageInfo.hasNextPage;

    if (cantFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return {
    repositories,
    error,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
