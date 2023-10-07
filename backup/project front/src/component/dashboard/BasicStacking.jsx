import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const seriesA = {
  data: [10, 3, 1, 4, 5],
  label: "Minutes",
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: "Calories",
};
const seriesC = {
  data: [3, 2, 4, 5, 1],
  label: "Kilogarm",
};
export default function BasicStacking() {
  return (
    <div className="w-[450px] m-auto py-3 item-center rounded shadow-lg border-2 ">
   
      <h1 className="text-center mr-1 font-bold text-xl">BasicStacking</h1>
      <div className="">
        <BarChart
          width={430}
          height={300}
          series={[
            { ...seriesA, stack: "total" },
            { ...seriesB, stack: "total" },
            { ...seriesC, stack: "total" },
          ]}
        />
      </div>
   
    </div>
  );
}
