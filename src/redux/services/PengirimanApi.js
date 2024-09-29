import { apiCore } from "./ApiCore"; // Verify this import path and the existence of `apiCore`

const PengirimanApi = apiCore.injectEndpoints({
  reducerPath: 'PengirimanApi',
  tagTypes: ["Pengiriman"],
  endpoints: (builder) => ({
    getPengiriman: builder.query({
      query: () => '/api/orders',
      transformResponse: (response) => {
        console.log("Raw response:", response); // Log the raw response for debugging
        return response.data; 
      },
    }),
    getCategory: builder.query({
      query: () => '/api/category',
      transformResponse: (response) => {
        return response.data; 
      },
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