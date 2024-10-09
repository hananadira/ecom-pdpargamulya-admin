import ApiCore from './ApiCore';

export const headerApi = ApiCore.injectEndpoints({
    endpoints: (builder) => ({
        getHeader: builder.query({
            query: () => 'api/users',
        }),
    }),
});

export const {
    useGetHeaderQuery,
} = headerApi;

export default headerApi;