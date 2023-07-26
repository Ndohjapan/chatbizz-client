import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:7002/api/1.0";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAvailableRooms: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/room/available/${data.roomId}`,
        method: "GET",
        headers: {
          "x-access-token": (data.token)
        }
      }),
    }),

    getStudentsInroom: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/user/filter?page=${data.page}&limit=${data.limit}`,
        method: "POST",
        headers: {
          "x-access-token": (data.token)
        },
        body: {room: data.room}
      }),
    }),
  })
});

export const { useGetAvailableRoomsMutation, useGetStudentsInroomMutation } = usersApiSlice;
