// services/PengirimanApi.js
import { apiCore } from './ApiCore';

const PengirimanApi = apiCore.injectEndpoints({
  reducerPath: 'PengirimanApi',
  tagTypes: ['Pengiriman'],
  endpoints: (builder) => ({
    getPengirimans: builder.query({
      query: () => '/api/orders',
      transformResponse: (response) => {
        console.log("raw response:", response);
        if (response && response.data) {
          return response.data; // Sesuaikan dengan struktur respons API Anda
        }
        console.error("Invalid response structure:", response || "response is null or undefined");
        return []; // Mengembalikan array kosong jika respons tidak valid
      },
    }),
    getPengiriman: builder.query({
      query: (id) => `/api/orders/${id}`,
      transformResponse: (response) => {
        console.log("raw response:", response);
        if (response && response.data) {
          return response.data; // Sesuaikan jika perlu
        }
        console.error("Invalid response structure:", response || "response is null or undefined");
        return null; // Mengembalikan null jika respons tidak valid
      },
    }),
    updatePengiriman: builder.mutation({
      query: ({ id, ...updatedPengiriman }) => ({
        url: `/api/orders/${id}`,
        method: 'PUT',
        body: updatedPengiriman,
      }),
      invalidatesTags: ['Pengiriman'],
    }),
    deletePengiriman: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pengiriman'],
    }),
  }),
});

export const {
  useGetPengirimansQuery,
  useGetPengirimanQuery,
  // useCreatePengirimanMutation,
  useUpdatePengirimanMutation,
  useDeletePengirimanMutation,
} = PengirimanApi;

export default PengirimanApi;
