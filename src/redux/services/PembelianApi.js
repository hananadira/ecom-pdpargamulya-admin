import { apiCore } from "./ApiCore";

const PembelianApi = apiCore.injectEndpoints({
  reducerPath: 'PembelianApi',
  tagTypes: ["Pembelian"],
  endpoints: (builder) => ({
    getPembelian: builder.query({
      query: () => '/api/orderDetail',
      transformResponse: (response) => response.data,
    }),
    getCategory: builder.query({
      query: () => '/api/category',
      transformResponse: (response) => response.data,
    }),
    getProduct: builder.query({
      query: (id) => `/api/orderDetail/${id}`,
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/orderDetail/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetPembelianQuery,
  useGetCategoryQuery,
  useGetProductQuery,
  useDeleteProductMutation,
} = PembelianApi;

export default PembelianApi;
