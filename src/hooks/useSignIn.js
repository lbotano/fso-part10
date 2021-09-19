import { useMutation } from '@apollo/client';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    return await mutate({
      variables: { username, password },
    });
  };

  return [signIn, result];
};

export default useSignIn;
