/* eslint-disable @typescript-eslint/no-unused-vars */

import { RootState } from "@/redux/store";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearUser, setUser } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.trobits.com/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

// Create the API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ["User"],
});
