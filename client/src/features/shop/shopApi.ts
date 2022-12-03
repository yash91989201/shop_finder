import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api_baseurl } from "../../config";

export interface ShopType {
  _id: string;
  name: string;
  area: string;
  category: string;
  opening_date: string;
  closing_date: string;
}

interface AddShopVarType {
  name: string;
  area: string;
  category: string;
  opening_date: Date;
  closing_date: Date;
}

interface QueryResponse<T> {
  success: boolean;
  message: string;
  data: {
    shop: T;
  };
}

// Define a service using a base URL and expected endpoints
const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${api_baseurl}/shop` }),
  endpoints: (builder) => ({
    getShops: builder.query<QueryResponse<ShopType[]>, {}>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    getShop: builder.query<QueryResponse<ShopType>, { shop_id: string }>({
      query: ({ shop_id }) => ({
        url: `/${shop_id}`,
        method: "GET",
      }),
    }),
    addShop: builder.mutation<QueryResponse<ShopType>, AddShopVarType>({
      query: (shop_details) => ({
        url: "/",
        method: "POST",
        body: shop_details,
        credentials: "include",
      }),
    }),
    deleteShop: builder.mutation<QueryResponse<ShopType>, { shop_id: string }>({
      query: ({ shop_id }) => ({
        url: `/${shop_id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateShop: builder.mutation<QueryResponse<ShopType>, ShopType>({
      query: (shop_details) => ({
        url: "/",
        method: "PUT",
        body: shop_details,
      }),
    }),
  }),
});
export default shopApi;

export const {
  useGetShopsQuery,
  useGetShopQuery,
  useAddShopMutation,
  useDeleteShopMutation,
  useUpdateShopMutation,
} = shopApi;
