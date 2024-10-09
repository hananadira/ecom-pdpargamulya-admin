// src/redux/services/PengirimanApi.js
import ApiCore from './ApiCore';

export const pengirimanApi = ApiCore.injectEndpoints({
  endpoints: (builder) => ({
    getPengiriman: builder.query({
      query: () => 'api/orders',
    }),
    createPengiriman: builder.mutation({
      query: (newPengiriman) => ({
        url: 'api/orders',
        method: 'POST',
        body: newPengiriman,
      }),
    }),
    updatePengiriman: builder.mutation({
      query: ({ id, ...updatedPengiriman }) => ({
        url: `api/orders/${id}`,
        method: 'PUT',
        body: updatedPengiriman,
      }),
    }),
    deletePengiriman: builder.mutation({
      query: (id) => ({
        url: `api/orders/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPengirimanQuery,
  useCreatePengirimanMutation,
  useUpdatePengirimanMutation,
  useDeletePengirimanMutation,
} = pengirimanApi;

export default pengirimanApi;
