import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $filter: String,
    $first: Int = 8,
    $after: String
  ) {
    repositories (
      searchKeyword: $filter,
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      first: $first,
      after: $after
    ) {
      edges {
        node {
          id,
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
          ownerAvatarUrl
        },
        cursor
      }
      pageInfo {
        startCursor,
        endCursor,
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query($id: ID!) {
    repository(id: $id) {
      id,
      fullName,
      description,
      language,
      forksCount,
      stargazersCount,
      ratingAverage,
      reviewCount,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id,
      username
    }
  }
`;

export const GET_REVIEWS = gql`
query($id: ID!) {
  repository(id: $id) {
    id
    fullName
  }
}
`;
