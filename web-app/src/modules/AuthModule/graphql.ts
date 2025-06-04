import { gql } from '@apollo/client'

export const SIGN_IN = gql`
  mutation basicAuth($basicAuthInput: BasicAuthInput!) {
    basicAuth(basicAuthInput: $basicAuthInput) {
      accessToken
      email
      username
    }
  }
`

export const CHECK_AUTH = gql`
  mutation checkAuth {
    checkAuth {
      email
      username
    }
  }
`
