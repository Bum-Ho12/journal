import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut } from './auth-slice';
import {RootState} from './index'

const baseUrl = 'https://journal-1ixk.onrender.com';

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;
        // console.log(token)
        if (token) {
            headers.set('Authorization', `Bearer ${token.access_token}`);
        }
        return headers;
    },
});


const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Journals'],
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        if (result.error && result.error.status === 401) {
            // Token expired or invalid, log out the user
            api.dispatch(logOut());
        }
        return result;
        },
        endpoints: (builder) => ({
        getJournals: builder.query({
            query: () => '/journals',
            providesTags: ['Journals'],
        }),
        getDailyJournals: builder.query({
            query: () => '/journals/daily',
        }),
        getWeeklyJournals: builder.query({
            query: () => '/journals/weekly',
        }),
        getMonthlyJournals: builder.query({
            query: () => '/journals/monthly',
        }),
        createJournal: builder.mutation({
            query: (newJournal) => ({
            url: '/journals',
            method: 'POST',
            body: newJournal,
            }),
            invalidatesTags: ['Journals'],
        }),
        updateJournal: builder.mutation({
            query: ({ id, ...updates }) => ({
            url: `/journals/${id}`,
            method: 'PUT',
            body: updates,
            }),
            invalidatesTags: ['Journals'],
        }),
        deleteJournal: builder.mutation({
            query: (id) => ({
            url: `/journals/${id}`,
            method: 'DELETE',
            }),
        }),
        registerUser: builder.mutation({
            query: (user) => ({
            url: '/users/',
            method: 'POST',
            body: user,
            }),
        }),
        loginUser: builder.mutation({
            query: (credentials) => ({
            url: '/token',
            method: 'POST',
            body: credentials,
            }),
        }),
    }),
});

export const {
    useGetJournalsQuery,
    useGetDailyJournalsQuery,
    useGetWeeklyJournalsQuery,
    useGetMonthlyJournalsQuery,
    useCreateJournalMutation,
    useUpdateJournalMutation,
    useDeleteJournalMutation,
    useRegisterUserMutation,
    useLoginUserMutation,
} = api;

export default api;
