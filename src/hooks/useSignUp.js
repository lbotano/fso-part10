import { useMutation, useApolloClient } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_USER);

  const createUser = async ({
    username,
    password,
  }) => {
    const data = await mutate({
      variables: {
        username,
        password,
      },
    });
    apolloClient.resetStore();

    return data;
  };

  return [createUser, result];
};

export default useSignUp;
