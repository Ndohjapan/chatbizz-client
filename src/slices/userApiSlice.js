import { apiSlice } from "./apiSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/auth/login`,
        method: "POST",
        body: data
      }),
    }),

    createStore: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/stores`,
        method: "POST",
        headers: {
          "x-access-token": data.token
        },
        body: data.storeData
      }),
    }),

    getQR: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/stores/qr/${data.phone}`,
        method: "GET",
        headers: {
          "x-access-token": data.token
        }
      }),
    }),

    getStores: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/stores`,
        method: "GET",
        headers: {
          "x-access-token": data.token
        }
      }),
    }),

    getImages: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/products/store/12345/images`,
        method: "GET",
        headers: {
          "x-access-token": data.token
        }
      }),
    }),
  })
});

export const { useLoginMutation, useCreateStoreMutation, useGetQRMutation, useGetStoresMutation, useGetImagesMutation } = usersApiSlice;
