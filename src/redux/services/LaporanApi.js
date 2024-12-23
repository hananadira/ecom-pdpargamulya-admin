import { apiCore } from "./ApiCore";

const LaporanApi = apiCore.injectEndpoints({
    reducerPath: 'LaporanApi',
    tagTypes: ["Laporan"],
    endpoints: (builder) => ({

        getReport: builder.query({
            query: ({ reportType, start_date, end_date }) => ({
                url: `/api/${reportType}?start_date=${start_date}&end_date=${end_date}`,
                params: { start_date, end_date }, // Pastikan params sudah sesuai
            }),
        }),


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
    useLazyGetReportQuery,
} = LaporanApi;

export default LaporanApi;