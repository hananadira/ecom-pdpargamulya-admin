import { apiCore } from "./ApiCore";

const PengirimanApi = apiCore.injectEndpoints({
  reducerPath: 'PengirimanApi',
  tagTypes: ["Pengiriman"],
  endpoints: (builder) => ({
    getPengiriman: builder.query({
      query: () => '/api/orders',
      transformResponse: (response) => response.data,
    }),
    getCategory: builder.query({
      query: () => '/api/category',
      transformResponse: (response) => response.data,
    }),
    getProduct: builder.query({
      query: (id) => `/api/orders/${id}`,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetPengirimanQuery,
  useGetCategoryQuery,
  useGetProductQuery,
  useDeleteProductMutation,
} = PengirimanApi;

export default PengirimanApi;
