import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import React from 'react';

type Props = {}

const Row1 = (props: Props) => {

  // API call
  const { data } = useGetKpisQuery();

  return (
    <>
      <DashboardBox gridArea="a"></DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
}

export default Row1;