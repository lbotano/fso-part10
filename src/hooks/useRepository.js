import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id,
    },
  });

  return {
    repo: data && {
      ...data.repository,
      reviews: data.repository.reviews.edges.map((edge) => (
        edge.node
      )),
    },
    error,
    loading
  };
};

export default useRepository;
