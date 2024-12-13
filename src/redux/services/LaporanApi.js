import { apiCore } from "./ApiCore";

const LaporanApi = apiCore.injectEndpoints({
    reducerPath: 'LaporanApi',
    tagTypes: ["Laporan"],
    endpoints: (builder) => ({
        getLaporansAll: builder.query({
            query: () => '/api/order/status',
            transformResponse: (response) => {
                console.log("Raw response:", response);
                return response.data || [];
            },
        }),
        getLaporansSetuju: builder.query({
            query: () => '/api/order/statusBerhasil',
            transformResponse: (response) => {
                console.log("Raw response:", response);
                return response.data || [];
            },
        }),
        setLaporansSetuju: builder.mutation({
            query: (id) => ({
                url: `/api/order/statusBerhasil/${id}`,
                method: 'PUT',
            }),
        }),
        getLaporansTolak: builder.query({
            query: () => '/api/order/statusGagal',
            transformResponse: (response) => {
                console.log("Raw response:", response);
                return response.data || [];
            },
        }),
        setLaporansTolak: builder.mutation({
            query: (id) => ({
                url: `/api/order/statusGagal/${id}`,
                method: 'PUT',
            }),
        }),
        getLaporan: builder.query({
            query: () => `/api/order/status/${id}`,
            transformResponse: (response) => {
                console.log("Raw response:", response);
                return response.data;
            },
        }),
        deleteLaporan: builder.mutation({
            query: (id) => ({
              url: `/api/order/status/${id}`,
              method: 'DELETE',
            }),
            transformResponse: (response) => response.data,
          }),
    }),
});

export const {
    useGetLaporansAllQuery,
    useGetLaporansSetujuQuery,
    useSetLaporansSetujuMutation,
    useSetLaporansTolakMutation,
    useGetLaporansTolakQuery,
    useGetLaporanQuery,
    useDeleteLaporanMutation,
} = LaporanApi;

export default LaporanApi;