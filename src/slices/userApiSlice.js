import { apiSlice } from "./apiSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAvailableRooms: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/room/available/${data.roomId}`,
        method: "GET",
        headers: {
          "x-access-token": (data.token)
        }
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/auth/login`,
        method: "POST",
        body: data
      }),
    }),

    getStudentsInroom: builder.mutation({
      query: (data) => ({
        url: `${BASE_URL}/user/filter?page=${data.page}&limit=${data.limit}`,
        method: "POST",
        headers: {
          "x-access-token": (data.token)
        },
        body: {room: data.room}
      }),
    }),
  })
});

export const { useGetAvailableRoomsMutation, useGetStudentsInroomMutation, useLoginMutation } = usersApiSlice;
