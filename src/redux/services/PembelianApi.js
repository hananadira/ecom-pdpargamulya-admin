import { apiCore } from './ApiCore';

const PembelianApi = apiCore.injectEndpoints({
  reducerPath: 'PembelianApi',
  tagTypes: ['Pembelian'],
  endpoints: (builder) => ({
    getPembelians: builder.query({
      query: () => '/api/orderDetail',
      transformResponse: (response) => {
        console.log("raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
    }),
    getPembelian: builder.query({
      query: (id) => `/api/orderDetail/${id}`,
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
      invalidatesTags: ['Pembelian'],
    }),
  }),
});

export const {
  useGetPembeliansQuery,
  useGetPembelianQuery,
  useUpdatePembelianMutation,
  useDeletePembelianMutation,
} = PembelianApi;

export default PembelianApi;
