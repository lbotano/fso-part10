import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (chosenSort) => {
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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy,
      orderDirection,
    },
  });

  const repositories = data
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  return {
    repositories,
    error,
    loading,
  };
};

export default useRepositories;
