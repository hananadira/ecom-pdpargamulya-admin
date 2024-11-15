// services/TampilanApi.js
import { apiCore } from './ApiCore';

const TampilanApi = apiCore.injectEndpoints({
  reducerPath: 'TampilanApi',
  tagTypes: ['Section'],
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => '/api/section',
      transformResponse: (response) => {
        console.log("raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
    }),
    getSection: builder.query({
      query: (id) => `/api/section/${id}`,
    }),
    createSection: builder.mutation({
      query: (newSection) => ({
        url: '/api/section',
        method: 'POST',
        body: newSection,
      }),
      invalidatesTags: ['Section'],
    }),
    updateSection: builder.mutation({
      query: ({ id, ...updatedSection }) => ({
        url: `/api/section/${id}`,
        method: 'PUT',
        body: updatedSection,
      }),
      invalidatesTags: ['Section'],
    }),
    deleteSection: builder.mutation({
      query: (id) => ({
        url: `/api/section/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Section'],
    }),

    getContents: builder.query({
      query: () => '/api/content',
      transformResponse: (response) => {
        console.log("raw response:", response);
        return response.data; // Sesuaikan dengan struktur respons API Anda
      },
    }),
    getContent: builder.query({
      query: (id) => `/api/content/${id}`,
    }),
    createContent: builder.mutation({
      query: (newContent) => ({
        url: '/api/content',
        method: 'POST',
        body: newContent,
      }),
      invalidatesTags: ['Content'],
    }),
    updateContent: builder.mutation({
      query: ({ id, ...updatedContent }) => ({
        url: `/api/content/${id}`,
        method: 'PUT',
        body: updatedContent,
      }),
      invalidatesTags: ['Content'],
    }),
    deleteContent: builder.mutation({
      query: (id) => ({
        url: `/api/content/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Content'],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,

  useGetContentsQuery,
  useGetContentQuery,
  useCreateContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = TampilanApi;

export default TampilanApi;
