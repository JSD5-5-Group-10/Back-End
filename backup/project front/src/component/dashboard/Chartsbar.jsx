import React from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export const Chartsbar = () => {
  return (
    <>
    <div className="w-[450px] m-auto py-3 item-center rounded shadow-lg border-2 ">
      <div className="text-center mr-1 font-bold text-xl">Chartsbar</div>
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={450}
        height={300}
      />
      </div>
    </>
  );
};
