import ApiCore from './ApiCore';

const pembelianApi = ApiCore.injectEndpoints({
  reducerPath: 'pembelianApi',
  tagTypes: ['Pembelian'],
  endpoints: (builder) => ({
    getPembelians: builder.query({
      query: () => '/api/orderDetail',
      transformResponse: (response) => {
        console.log('Raw response: ', response); //log the raw response for debugging 
        return response.data;
      },
    }),
    getPembelian: builder.query({
      query: (id) => `/api/orderDetail/${id}`,
    }),
    createPembelian: builder.mutation({
      query: (newPembelian) => ({
        url: '/api/orderDetail',
        method: 'POST',
        body: newPembelian,
      }),
      invalidatesTags: ['Pembelian'],
    }),
    updatePembelian: builder.mutation({
      query: ({ id, ...updatedPembelian }) => ({
        url: `/api/orderDetail/${id}`,
        method: 'PUT',
        body: updatedPembelian,
      }),
      invalidatesTags: ['Pembelian'],
    }),
    deletePembelian: builder.mutation({
      query: (id) => ({
        url: `/api/orderDetail/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetPembeliansQuery,
  useGetPembelianQuery,
  useCreatePembelianMutation,
  useUpdatePembelianMutation,
  useDeletePembelianMutation,
} = pembelianApi;

export default pembelianApi;