import { baseApi } from './baseApi';

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (userId) => ({
        url: `/notifications/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),
    markAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} = notificationApi; 