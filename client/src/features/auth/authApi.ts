import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_baseurl } from "../../config";

interface SellerType {
  _id: string;
  email: string;
  username: string;
  password: string;
}

interface AuthStatusType {
  isAuthenticated: boolean;
  user: SellerType;
  error?: string;
}

interface QueryResponse<T> {
  success: boolean;
  message: string;
  data: {
    shop: T;
  };
}

// Define a service using a base URL and expected endpoints
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api_baseurl}/seller`,
  }),

  endpoints: (builder) => ({
    signupUser: builder.mutation<
      QueryResponse<SellerType>,
      { username: string; email: string; password: string }
    >({
      query: (credential) => ({
        url: "/signup",
        method: "POST",
        body: credential,
      }),
    }),
    loginUser: builder.mutation<
      QueryResponse<SellerType>,
      { email: string; password: string }
    >({
      query: (credential) => ({
        url: "/login",
        method: "POST",
        body: credential,
        credentials: "include",
      }),
    }),
    logoutUser: builder.mutation<
      {
        success: boolean;
        message: string;
        data: SellerType;
      },
      {}
    >({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    checkAuthStatus: builder.query<AuthStatusType, {}>({
      query: () => ({
        url: "/check-auth",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});
export default authApi;

export const {
  useSignupUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useCheckAuthStatusQuery,
} = authApi;
