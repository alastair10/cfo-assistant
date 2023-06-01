import DashboardBox from "@/components/DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import React from "react";

const Row3 = (props: Props) => {
  // PULL IN REQUIRED DATA
  const { data: transactionData } = useGetTransactionsQuery(); // pull in the data
  // console.log(transactionData) // test to see data is pulling in 50 txns
  const { data: productData } = useGetProductsQuery(); // pull in product data
  const { data: kpiData } = useGetKpisQuery(); // pull in kpi data

  return (
    <>
      <DashboardBox gridArea="g"></DashboardBox>
      <DashboardBox gridArea="h"></DashboardBox>
      <DashboardBox gridArea="i"></DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  );
};

export default Row3;
