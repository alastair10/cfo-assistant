import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi lets us create endpoints to call backend
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main", // just name for API call
  tagTypes: ["Kpis"],
  endpoints: (build) => ({
    getKpis: build.query<void, void>({ //voids will be removed, placeholder for args
      query: () => "kpi/kpis/",
      providesTags: ["Kpis"]
    }),
  }),
})

export const { useGetKpisQuery } = api;