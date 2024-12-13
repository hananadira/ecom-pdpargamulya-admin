import { apiCore } from './ApiCore';

const PembelianApi = apiCore.injectEndpoints({
  reducerPath: 'PembelianApi',
  tagTypes: ['Pembelian'], // Menambahkan tipe tag untuk caching/invalidation
  endpoints: (builder) => ({
    // Query untuk mendapatkan semua data pembelian
    getPembelians: builder.query({
      query: () => '/api/orders',
      transformResponse: (response) => {
        console.log("Raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
      providesTags: ['Pembelian'], // Menyediakan data untuk invalidation cache
    }),

    // Query untuk mendapatkan detail pembelian berdasarkan ID
    getPembelian: builder.query({
      query: (id) => `/api/orderDetail/${id}`,
      providesTags: ['Pembelian'], // Menandai data untuk cache
    }),

    // Mutation untuk memperbarui data pembelian
    updatePembelian: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/orderDetail/${id}`,
        method: 'POST', // Tetap menggunakan POST
        body: {
          status,
          _method: 'PUT', // Overriding ke PUT
        },
      }),
      invalidatesTags: ['Pembelian'], // Menginvalidasi cache pembelian setelah update
    }),

    // Mutation untuk menghapus data pembelian
    deletePembelian: builder.mutation({
      query: (id) => ({
        url: `/api/orderDetail/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pembelian'], // Menginvalidasi cache pembelian setelah delete
    }),

    getPembelianAccept: builder.query({
      query: (id) => `/api/order/statusBerhasil/${id}`,
      transformResponse: (response) => {
        console.log("Raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
      providesTags: ['Pembelian'],
    }),

    getPembelianReject: builder.query({
      query: (id) => `/api/order/statusGagal/${id}`,
      transformResponse: (response) => {
        console.log("Raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
      providesTags: ['Pembelian'],
    }),
  }),
});

// Ekspor hooks untuk digunakan di komponen React
export const {
  useGetPembeliansQuery,
  useGetPembelianQuery,
  useGetPembelianAcceptQuery,
  useGetPembelianRejectQuery,
  useUpdatePembelianMutation,
  useDeletePembelianMutation,
} = PembelianApi;

export default PembelianApi;
