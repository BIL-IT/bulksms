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
  sender: Scalars['String']['output'];
  status: Scalars['String']['output'];
  time: Scalars['DateTime']['output'];
};

export type CronJobNewFielUpdateInput = {
  id: Scalars['String']['input'];
  message: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type CronJobNewFieldInput = {
  message: Scalars['String']['input'];
  number: Scalars['String']['input'];
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
  addNewField: Scalars['String']['output'];
  deleteJob: Scalars['String']['output'];
  editField: Scalars['String']['output'];
  generateReport: Scalars['String']['output'];
  sendOTP: Scalars['String']['output'];
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


export type MutationAddNewFieldArgs = {
  cronJobNewFieldInput: CronJobNewFieldInput;
};


export type MutationDeleteJobArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditFieldArgs = {
  cronJobNewFielUpdateInput: CronJobNewFielUpdateInput;
};


export type MutationGenerateReportArgs = {
  reportDetailsInput: ReportDetailsInput;
};


export type MutationSendOtpArgs = {
  phoneNumber: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  GetAllSMS: Array<AllMessages>;
  Me: CurrentUserDetail;
  getAllScheduledJobs: Array<ScheduledJobsOutput>;
};

export type ReportDetailsInput = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
  status: Array<Scalars['String']['input']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type ScheduledJobsOutput = {
  __typename?: 'ScheduledJobsOutput';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

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

export type GenerateReportMutationVariables = Exact<{
  reportDetailsInput: ReportDetailsInput;
}>;


export type GenerateReportMutation = { __typename?: 'Mutation', generateReport: string };

export type GetAllSmsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSmsQuery = { __typename?: 'Query', GetAllSMS: Array<{ __typename?: 'AllMessages', id: string, time: any, sender: string, phone: string, status: string, content: string }> };

export type SendSmsMutationVariables = Exact<{
  messageInput: MessageInput;
}>;


export type SendSmsMutation = { __typename?: 'Mutation', SendSMS: { __typename?: 'SuccessMessageInput', message: string } };

export type AddJobMutationVariables = Exact<{
  cronJobNewFieldInput: CronJobNewFieldInput;
}>;


export type AddJobMutation = { __typename?: 'Mutation', addNewField: string };

export type DeleteJobMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob: string };

export type ScheduledJobsQueryVariables = Exact<{ [key: string]: never; }>;


export type ScheduledJobsQuery = { __typename?: 'Query', getAllScheduledJobs: Array<{ __typename?: 'ScheduledJobsOutput', id: string, createdAt: any, to: string, message: string }> };

export type UpdateJobMutationVariables = Exact<{
  cronJobNewFielUpdateInput: CronJobNewFielUpdateInput;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', editField: string };


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
export const GenerateReportDocument = gql`
    mutation GenerateReport($reportDetailsInput: ReportDetailsInput!) {
  generateReport(reportDetailsInput: $reportDetailsInput)
}
    `;
export type GenerateReportMutationFn = Apollo.MutationFunction<GenerateReportMutation, GenerateReportMutationVariables>;

/**
 * __useGenerateReportMutation__
 *
 * To run a mutation, you first call `useGenerateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateReportMutation, { data, loading, error }] = useGenerateReportMutation({
 *   variables: {
 *      reportDetailsInput: // value for 'reportDetailsInput'
 *   },
 * });
 */
export function useGenerateReportMutation(baseOptions?: Apollo.MutationHookOptions<GenerateReportMutation, GenerateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateReportMutation, GenerateReportMutationVariables>(GenerateReportDocument, options);
      }
export type GenerateReportMutationHookResult = ReturnType<typeof useGenerateReportMutation>;
export type GenerateReportMutationResult = Apollo.MutationResult<GenerateReportMutation>;
export type GenerateReportMutationOptions = Apollo.BaseMutationOptions<GenerateReportMutation, GenerateReportMutationVariables>;
export const GetAllSmsDocument = gql`
    query GetAllSMS {
  GetAllSMS {
    id
    time
    sender
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
export const AddJobDocument = gql`
    mutation AddJob($cronJobNewFieldInput: CronJobNewFieldInput!) {
  addNewField(cronJobNewFieldInput: $cronJobNewFieldInput)
}
    `;
export type AddJobMutationFn = Apollo.MutationFunction<AddJobMutation, AddJobMutationVariables>;

/**
 * __useAddJobMutation__
 *
 * To run a mutation, you first call `useAddJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addJobMutation, { data, loading, error }] = useAddJobMutation({
 *   variables: {
 *      cronJobNewFieldInput: // value for 'cronJobNewFieldInput'
 *   },
 * });
 */
export function useAddJobMutation(baseOptions?: Apollo.MutationHookOptions<AddJobMutation, AddJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddJobMutation, AddJobMutationVariables>(AddJobDocument, options);
      }
export type AddJobMutationHookResult = ReturnType<typeof useAddJobMutation>;
export type AddJobMutationResult = Apollo.MutationResult<AddJobMutation>;
export type AddJobMutationOptions = Apollo.BaseMutationOptions<AddJobMutation, AddJobMutationVariables>;
export const DeleteJobDocument = gql`
    mutation DeleteJob($id: String!) {
  deleteJob(id: $id)
}
    `;
export type DeleteJobMutationFn = Apollo.MutationFunction<DeleteJobMutation, DeleteJobMutationVariables>;

/**
 * __useDeleteJobMutation__
 *
 * To run a mutation, you first call `useDeleteJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJobMutation, { data, loading, error }] = useDeleteJobMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJobMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJobMutation, DeleteJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DeleteJobDocument, options);
      }
export type DeleteJobMutationHookResult = ReturnType<typeof useDeleteJobMutation>;
export type DeleteJobMutationResult = Apollo.MutationResult<DeleteJobMutation>;
export type DeleteJobMutationOptions = Apollo.BaseMutationOptions<DeleteJobMutation, DeleteJobMutationVariables>;
export const ScheduledJobsDocument = gql`
    query ScheduledJobs {
  getAllScheduledJobs {
    id
    createdAt
    to
    message
  }
}
    `;

/**
 * __useScheduledJobsQuery__
 *
 * To run a query within a React component, call `useScheduledJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduledJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduledJobsQuery({
 *   variables: {
 *   },
 * });
 */
export function useScheduledJobsQuery(baseOptions?: Apollo.QueryHookOptions<ScheduledJobsQuery, ScheduledJobsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ScheduledJobsQuery, ScheduledJobsQueryVariables>(ScheduledJobsDocument, options);
      }
export function useScheduledJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScheduledJobsQuery, ScheduledJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ScheduledJobsQuery, ScheduledJobsQueryVariables>(ScheduledJobsDocument, options);
        }
export function useScheduledJobsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ScheduledJobsQuery, ScheduledJobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ScheduledJobsQuery, ScheduledJobsQueryVariables>(ScheduledJobsDocument, options);
        }
export type ScheduledJobsQueryHookResult = ReturnType<typeof useScheduledJobsQuery>;
export type ScheduledJobsLazyQueryHookResult = ReturnType<typeof useScheduledJobsLazyQuery>;
export type ScheduledJobsSuspenseQueryHookResult = ReturnType<typeof useScheduledJobsSuspenseQuery>;
export type ScheduledJobsQueryResult = Apollo.QueryResult<ScheduledJobsQuery, ScheduledJobsQueryVariables>;
export const UpdateJobDocument = gql`
    mutation UpdateJob($cronJobNewFielUpdateInput: CronJobNewFielUpdateInput!) {
  editField(cronJobNewFielUpdateInput: $cronJobNewFielUpdateInput)
}
    `;
export type UpdateJobMutationFn = Apollo.MutationFunction<UpdateJobMutation, UpdateJobMutationVariables>;

/**
 * __useUpdateJobMutation__
 *
 * To run a mutation, you first call `useUpdateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJobMutation, { data, loading, error }] = useUpdateJobMutation({
 *   variables: {
 *      cronJobNewFielUpdateInput: // value for 'cronJobNewFielUpdateInput'
 *   },
 * });
 */
export function useUpdateJobMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJobMutation, UpdateJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJobMutation, UpdateJobMutationVariables>(UpdateJobDocument, options);
      }
export type UpdateJobMutationHookResult = ReturnType<typeof useUpdateJobMutation>;
export type UpdateJobMutationResult = Apollo.MutationResult<UpdateJobMutation>;
export type UpdateJobMutationOptions = Apollo.BaseMutationOptions<UpdateJobMutation, UpdateJobMutationVariables>;