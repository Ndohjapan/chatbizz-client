import { apiSlice } from "./apiSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/auth/login`,
        method: "POST",
        body: data,
      }),
    }),

    createStore: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/stores`,
        method: "POST",
        headers: {
          "x-access-token": data.token,
        },
        body: data.storeData,
      }),
    }),

    getQR: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/stores/qr/${data.phone}`,
        method: "GET",
        headers: {
          "x-access-token": data.token,
        },
      }),
    }),

    getStores: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/stores`,
        method: "GET",
        headers: {
          "x-access-token": data.token,
        },
      }),
    }),

    getImages: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/store/${data.store}/images`,
        method: "GET",
        headers: {
          "x-access-token": data.token,
        },
      }),
    }),

    getProducts: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/store/${data.store}`,
        method: "GET",
        headers: {
          "x-access-token": data.token,
        },
      }),
    }),

    getProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/${data.product}/store/${data.store}`,
        method: "GET",
        headers: {
          "x-access-token": data.token,
        },
      }),
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products`,
        method: "POST",
        headers: {
          "x-access-token": data.token,
        },
        body: data.product,
      }),
    }),

    getVariant: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/variants/${data.variant}/products/${data.product}`,
        method: "GET",
        headers: {
          "x-access-token": data.token,
        },
      }),
    }),

    updateVariant: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/variants/${data.variantId}`,
        method: "PUT",
        headers: {
          "x-access-token": data.token,
        },
        body: data.updateData,
      }),
    }),
    
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/${data.productId}`,
        method: "PUT",
        headers: {
          "x-access-token": data.token,
        },
        body: data.updateData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateStoreMutation,
  useGetQRMutation,
  useGetStoresMutation,
  useGetImagesMutation,
  useCreateProductMutation,
  useGetProductsMutation,
  useGetProductMutation,
  useGetVariantMutation,
  useUpdateVariantMutation,
  useUpdateProductMutation
} = usersApiSlice;
