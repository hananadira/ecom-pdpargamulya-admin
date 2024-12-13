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
      query: ({ id, ...updatedRekening }) => ({
        url: `/api/rekening/${id}`,
        method: 'PUT',
        body: updatedRekening,
      }),
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
