import { apiCore } from "./ApiCore"; // Pastikan path ini benar dan `apiCore` diimport dengan benar

const ProductApi = apiCore.injectEndpoints({
  reducerPath: 'ProductApi',
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/api/products',
      transformResponse: (response) => {
        console.log("Raw response:", response); // Log the raw response for debugging
        return response.data; 
      },
    }),
    getSearchProduct: builder.query({
      query: (searchKey) => `/api/product/search?query=${searchKey}`, // Ensure searchKey is passed in
      transformResponse: (response) => {
        console.log("Raw response search:", response);
        return response; 
      },
    }),
    getKategories: builder.query({
      query: () => '/api/category',
      transformResponse: (response) => {
        return response.data; 
      },
    }),
    getKategori: builder.query({
      query: (id) => `/api/category/${id}`,
      transformResponse: (response) => {
        return response.data; 
      },
    }),
    getProduct: builder.query({
      query: (id) => `/api/products/${id}`,
      transformResponse: (response) => {
        console.log("raw response:", response); // Tambahkan ini
        return response.data; // Sesuaikan jika perlu
      },
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/api/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    createKategori: builder.mutation({
      query: (newKategori) => ({
        url: '/api/category',
        method: 'POST',
        body: newKategori,
      }),
      invalidatesTags: ['Kategori'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: ['Product'],
    }),
    updateKategori: builder.mutation({
      query: ({ id, ...updatedKategori }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        body: updatedKategori,
      }),
      invalidatesTags: ['Kategori'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
    deleteKategori: builder.mutation({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSearchProductQuery,
  useGetKategoriesQuery,
  useGetKategoriQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useCreateKategoriMutation,
  useUpdateProductMutation,
  useUpdateKategoriMutation,
  useDeleteProductMutation,
  useDeleteKategoriMutation,
} = ProductApi;

export default ProductApi;
