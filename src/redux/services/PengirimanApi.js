// services/PengirimanApi.js
import { apiCore } from './ApiCore';

const PengirimanApi = apiCore.injectEndpoints({
  reducerPath: 'PengirimanApi',
  tagTypes: ['Pengiriman'],
  endpoints: (builder) => ({
    getPengirimans: builder.query({
      query: () => '/api/shipping',
      transformResponse: (response) => {
        console.log("raw response:", response);
        if (response && response.data) {
          return response.data; // Sesuaikan dengan struktur respons API Anda
        }
        console.error("Invalid response structure:", response || "response is null or undefined");
        return []; // Mengembalikan array kosong jika respons tidak valid
      },
    }),
    getPengirimanSelesai: builder.query({
      query: () => 'api/shipping/status',
      transformResponse: (response) => {
        console.log("raw response:", response);
        return response.pengiriman_sampai;
      },
    }),
    getPengiriman: builder.query({
      query: (id) => `/api/shipping/${id}`,
      transformResponse: (response) => {
        console.log("raw response:", response);
        if (response && response.data) {
          return response.data; // Sesuaikan jika perlu
        }
        console.error("Invalid response structure:", response || "response is null or undefined");
        return null; // Mengembalikan null jika respons tidak valid
      },
    }),
    updateStatusKirim: builder.mutation({
      query: ({ id, updatedStatusKirim }) => ({
        url: `api/shipping/statusKirim/${id}`,
        method: 'PUT',
        body: { shipping_status: updatedStatusKirim }, // Pastikan nama field sesuai API
      }),
      invalidatesTags: ['Pengiriman'],
    }),    
    updateStatusSampai: builder.mutation({
      query: ({ id, updatedStatusSampai }) => ({
        url: `api/shipping/statusSampai/${id}`,
        method: 'PUT',
        body: { shipping_status: updatedStatusSampai }, // Pastikan nama field sesuai API
      }),
      invalidatesTags: ['Pengiriman'],
    }),    
    deletePengiriman: builder.mutation({
      query: (id) => ({
        url: `/api/shipping/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pengiriman'],
    }),

    // pengiriman (MASTER)
    getMasterPengirimans: builder.query({
      query: () => 'api/shippingCost',
      transformResponse: (response) => {
        console.log("raw response:", response);
        if (response && response.data) {
          return response.data; // Sesuaikan dengan struktur respons API Anda
        }
        console.error("Invalid response structure:", response || "response is null or undefined");
        return []; // Mengembalikan array kosong jika respons tidak valid
      },
    }),
    createMasterPengiriman: builder.mutation({
      query: (newPengiriman) => ({
        url: 'api/shippingCost',
        method: 'POST',
        body: newPengiriman,
      }),
      invalidatesTags: ['Pengiriman'],
    }),
    getMasterPengiriman: builder.query({
      query: (id) => `/api/shippingCost/${id}`,
      transformResponse: (response) => {
        console.log("raw response:", response);
        if (response && response.data) {
          return response.data; // Sesuaikan jika perlu
        }
        console.error("Invalid response structure:", response || "response is null or undefined");
        return null; // Mengembalikan null jika respons tidak valid
      },
    }),
    updateMasterPengiriman: builder.mutation({
      query: ({ id, ...updatedPengiriman }) => ({
        url: `/api/shippingCost/${id}`,
        method: 'PUT',
        body: updatedPengiriman,
      }),
      invalidatesTags: ['Pengiriman'],
    }),
    deleteMasterPengiriman: builder.mutation({
      query: (id) => ({
        url: `/api/shippingCost/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pengiriman'],
    }),
  }),
});

export const {
  useGetPengirimansQuery,
  useGetPengirimanQuery,
  useGetMasterPengirimanQuery,
  useGetMasterPengirimansQuery,
  useGetPengirimanSelesaiQuery,
  useCreateMasterPengirimanMutation,
  useUpdateStatusKirimMutation,
  useUpdateStatusSampaiMutation,
  useDeletePengirimanMutation,
  useUpdateMasterPengirimanMutation,
  useDeleteMasterPengirimanMutation,
} = PengirimanApi;

export default PengirimanApi;
