// services/UserApi.js
import { apiCore } from './ApiCore';

const UserApi = apiCore.injectEndpoints({
  reducerPath: 'UserApi',
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/api/users',
      transformResponse: (response) => {
        console.log("raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
    }),
    getUser: builder.query({
      query: (id) => `/api/users/${id}`,
      transformResponse: (response) => {
        console.log("raw response:", response); // Tambahkan ini
        return response.data; // Sesuaikan jika perlu
      },
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: '/api/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updateUser }) => ({
        url: `/api/users/${id}`,
        method: 'POST',
        body: updateUser,
      }),
      invalidatesTags: ['User'],
    }),
    // updateUser: builder.mutation({
    //   query: (formData) => ({
    //     url: `/api/users/${formData.get("id")}`,
    //     method: 'PUT',
    //     body: formData,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserApi;

export default UserApi;
