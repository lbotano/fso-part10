import { useQuery } from '@apollo/client';

import { AUTHORIZED_USER } from '../graphql/queries';

const useUser = () => {
  const { data, loading, error, ...result } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  return { data, loading, error, ...result};
};

export default useUser;
