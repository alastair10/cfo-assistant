import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi lets us create endpoints to call backend
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main", // just name for API call
  tagTypes: ["Kpis"],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({  // GetKpisResponse is the object inside our data array
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"]
    }),
  }),
})

export const { useGetKpisQuery } = api;