import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse } from "./types";

// createApi lets us create endpoints to call backend
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main", // just name for API call
  tagTypes: ["Kpis", "Products"], // this is where data is saved once a GET query is made
  endpoints: (build) => ({
    // GET Kpis query
    getKpis: build.query<Array<GetKpisResponse>, void>({  // GetKpisResponse is the object inside our data array
      query: () => "kpi/kpis/", // needs to match route
      providesTags: ["Kpis"]
    }),
    // GET products query
    getProducts: build.query<Array<GetProductsResponse>, void>({  // GetProductsResponse is the object inside our data array
      query: () => "product/products/",
      providesTags: ["Products"]
    }),
  }),
})

export const { useGetKpisQuery, useGetProductsQuery } = api;