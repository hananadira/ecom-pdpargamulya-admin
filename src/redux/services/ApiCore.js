import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrlApi = import.meta.env.VITE_BASE_URL_API;

const baseQueryAccessToken = fetchBaseQuery({
  baseUrl: baseUrlApi,
  prepareHeaders: (headers, { getState }) => {
    headers.set("ngrok-skip-browser-warning", "true");
    // Uncomment the following lines if you are using authentication
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
//   menambahkan untuk mengambil data 
    // getData: builder.query({
    // query: (id) => `https://<random-string>.ngrok.io/api/data/${id}`,
    // }),
});
