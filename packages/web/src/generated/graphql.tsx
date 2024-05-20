import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type AllMessages = {
  __typename?: 'AllMessages';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  status: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
};

export type CurrentUserDetail = {
  __typename?: 'CurrentUserDetail';
  email: Scalars['String']['output'];
  lastLoggedIn?: Maybe<Scalars['String']['output']>;
  role: Role;
  sub: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LoginDetails = {
  emailOrUsername: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MessageInput = {
  content: Scalars['String']['input'];
  phone: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  Login: SuccessMessage;
  Logout: SuccessMessage;
  SendSMS: SuccessMessageInput;
  SignUp: SuccessMessage;
};


export type MutationLoginArgs = {
  loginDetails: LoginDetails;
};


export type MutationSendSmsArgs = {
  messageInput: MessageInput;
};


export type MutationSignUpArgs = {
  signupDetails: SignupDetails;
};

export type Query = {
  __typename?: 'Query';
  GetAllSMS: Array<AllMessages>;
  Me: CurrentUserDetail;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SignupDetails = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message: Scalars['String']['output'];
};

export type SuccessMessageInput = {
  __typename?: 'SuccessMessageInput';
  message: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  loginDetails: LoginDetails;
}>;


export type LoginMutation = { __typename?: 'Mutation', Login: { __typename?: 'SuccessMessage', message: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', Logout: { __typename?: 'SuccessMessage', message: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', Me: { __typename?: 'CurrentUserDetail', sub: string, email: string, username: string, role: Role, lastLoggedIn?: string | null } };

export type SignUpMutationVariables = Exact<{
  signupDetails: SignupDetails;
}>;


export type SignUpMutation = { __typename?: 'Mutation', SignUp: { __typename?: 'SuccessMessage', message: string } };

export type GetAllSmsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSmsQuery = { __typename?: 'Query', GetAllSMS: Array<{ __typename?: 'AllMessages', id: string, time: any, phone: string, status: string, content: string }> };

export type SendSmsMutationVariables = Exact<{
  messageInput: MessageInput;
}>;


export type SendSmsMutation = { __typename?: 'Mutation', SendSMS: { __typename?: 'SuccessMessageInput', message: string } };


export const LoginDocument = gql`
    mutation Login($loginDetails: LoginDetails!) {
  Login(loginDetails: $loginDetails) {
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginDetails: // value for 'loginDetails'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  Logout {
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  Me {
    sub
    email
    username
    role
    lastLoggedIn
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($signupDetails: SignupDetails!) {
  SignUp(signupDetails: $signupDetails) {
    message
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signupDetails: // value for 'signupDetails'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const GetAllSmsDocument = gql`
    query GetAllSMS {
  GetAllSMS {
    id
    time
    phone
    status
    content
  }
}
    `;

/**
 * __useGetAllSmsQuery__
 *
 * To run a query within a React component, call `useGetAllSmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSmsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSmsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSmsQuery, GetAllSmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSmsQuery, GetAllSmsQueryVariables>(GetAllSmsDocument, options);
      }
export function useGetAllSmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSmsQuery, GetAllSmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSmsQuery, GetAllSmsQueryVariables>(GetAllSmsDocument, options);
        }
export function useGetAllSmsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllSmsQuery, GetAllSmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllSmsQuery, GetAllSmsQueryVariables>(GetAllSmsDocument, options);
        }
export type GetAllSmsQueryHookResult = ReturnType<typeof useGetAllSmsQuery>;
export type GetAllSmsLazyQueryHookResult = ReturnType<typeof useGetAllSmsLazyQuery>;
export type GetAllSmsSuspenseQueryHookResult = ReturnType<typeof useGetAllSmsSuspenseQuery>;
export type GetAllSmsQueryResult = Apollo.QueryResult<GetAllSmsQuery, GetAllSmsQueryVariables>;
export const SendSmsDocument = gql`
    mutation SendSMS($messageInput: MessageInput!) {
  SendSMS(messageInput: $messageInput) {
    message
  }
}
    `;
export type SendSmsMutationFn = Apollo.MutationFunction<SendSmsMutation, SendSmsMutationVariables>;

/**
 * __useSendSmsMutation__
 *
 * To run a mutation, you first call `useSendSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSmsMutation, { data, loading, error }] = useSendSmsMutation({
 *   variables: {
 *      messageInput: // value for 'messageInput'
 *   },
 * });
 */
export function useSendSmsMutation(baseOptions?: Apollo.MutationHookOptions<SendSmsMutation, SendSmsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendSmsMutation, SendSmsMutationVariables>(SendSmsDocument, options);
      }
export type SendSmsMutationHookResult = ReturnType<typeof useSendSmsMutation>;
export type SendSmsMutationResult = Apollo.MutationResult<SendSmsMutation>;
export type SendSmsMutationOptions = Apollo.BaseMutationOptions<SendSmsMutation, SendSmsMutationVariables>;