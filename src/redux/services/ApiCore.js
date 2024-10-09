import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseUrlApi = import.meta.env.VITE_BASE_URL_API;

const baseQueryAccessToken = fetchBaseQuery({
baseUrl: baseUrlApi,
  prepareHeaders: (headers, { getState }) => {
    headers.set("https://ac9a-45-64-100-26.ngrok-free.app", "true");
    // const token = getState().auth.token;
    // if (token) {
    //   headers.set("Authorization", `Bearer ${token}`);
    // }
    return headers;
  },
});

export const ApiCore = createApi({
  baseQuery: baseQueryAccessToken,
  endpoints: () => ({}),
});

export default ApiCore;