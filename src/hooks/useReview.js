import { useMutation, useApolloClient } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    repositoryName,
    ownerName,
    rating,
    text,
  }) => {
    const data = await mutate({
      variables: {
        repositoryName,
        ownerName,
        rating: Number(rating),
        text,
      }
    });
    apolloClient.resetStore();

    return data;
  };

  return [createReview, result];
};

export default useReview;
