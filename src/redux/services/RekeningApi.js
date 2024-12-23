// services/RekeningApi.js
import { apiCore } from './ApiCore';

const RekeningApi = apiCore.injectEndpoints({
  reducerPath: 'RekeningApi',
  tagTypes: ['Rekening'],
  endpoints: (builder) => ({
    createRekening: builder.mutation({
      query: (newRekening) => ({
        url: '/api/rekening',
        method: 'POST',
        body: newRekening,
      }),
      invalidatesTags: ['Rekening'],
    }),
    getRekenings: builder.query({
      query: () => '/api/rekening',
      transformResponse: (response) => {
        console.log("raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
    }),
    getRekening: builder.query({
      query: (id) => `/api/rekening/${id}`,
      transformResponse: (response) => {
        console.log("raw response:", response); // Tambahkan ini
        return response.data; // Sesuaikan jika perlu
      },
    }),

    
    updateRekening: builder.mutation({
      query: ({ id, ...updateRekening }) => {
        const rekeningPayload = new FormData();
        rekeningPayload.append('_method', 'PUT'); // Override method with PUT
        for (const key in updateRekening) {
          rekeningPayload.append(key, updateRekening[key]);
        }
        // If there's an image, append it to FormData
        if (updateRekening.payment_master_image) {
          rekeningPayload.append('payment_master_image', updateRekening.payment_master_image);
        }
        return {
          url: `/api/rekening/${id}`,
          method: 'POST', // Sending as POST, but we override to PUT with _method
          body: rekeningPayload, // Send as FormData
        };
      },
      invalidatesTags: ['Rekening'],
    }),

    deleteRekening: builder.mutation({
      query: (id) => ({
        url: `/api/rekening/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rekening'],
    }),
  }),
});

export const {
  useGetRekeningsQuery,
  useGetRekeningQuery,
  // useGetUserQuery,
  useCreateRekeningMutation,
  useUpdateRekeningMutation,
  useDeleteRekeningMutation,
} = RekeningApi;

export default RekeningApi;
