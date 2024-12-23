import { apiCore } from './ApiCore';

const PaymentApi = apiCore.injectEndpoints({
    reducerPath: 'PaymentApi',
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getPayment: builder.query({
            query: (id) => `/api/payment/${id}`,
            providesTags: ['Payment'],
        }),
    }),
});

export const {
    useGetPaymentQuery,
} = PaymentApi;

export default PaymentApi; 