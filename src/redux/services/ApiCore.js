import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrlApi = import.meta.env.VITE_BASE_URL_API;

const baseQueryAccessToken = fetchBaseQuery({
baseUrl: baseUrlApi,
  prepareHeaders: (headers, { getState }) => {
    headers.set("ngrok-skip-browser-warning", "true");
    // const token = getState().auth.token;
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

export const apiCore = createApi({
  baseQuery: baseQueryAccessToken,
  endpoints: () => ({}),
});