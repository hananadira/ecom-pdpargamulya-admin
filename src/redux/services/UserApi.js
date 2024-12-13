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
      query: ({ id, ...updateUser }) => {
        const userPayload = new FormData();
        userPayload.append('_method', 'PUT'); // Override method with PUT
        for (const key in updateUser) {
          userPayload.append(key, updateUser[key]);
        }
        // If there's an image, append it to FormData
        if (updateUser.image) {
          userPayload.append('image', updateUser.image);
        }
        return {
          url: `/api/users/${id}`,
          method: 'POST', // Sending as POST, but we override to PUT with _method
          body: userPayload, // Send as FormData
        };
      },
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
