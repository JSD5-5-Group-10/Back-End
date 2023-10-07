import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";


const data = [
  { value: 9999, label: "Run" },
  { value: 900.2, label: "Yoga" },
  { value: 1125, label: "Aerobics" },
  { value: 2550, label: "Muaythai" },
  { value: 2110, label: "Training" },
];

const size = {
  width: 400,
  height: 300,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 18,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    </>
  );
}

const sumCalories = data.reduce(
  (accumulator, currentValue) => accumulator + currentValue.value,
  0
);

export default function PieChartWithCenterLabel() {
  return (
    <div className="w-[450px] m-auto py-3 item-center rounded shadow-lg border-2 ">
      <div className="flex justify-center items-center">
        <h1 className="text-center mr-1 font-bold text-xl">Calories Burned </h1>
        <img
          className="w-[22px]"
          src="https://cdn-icons-png.flaticon.com/512/7246/7246702.png"
          alt=""
        />
      </div>
      <PieChart series={[{ data, innerRadius: 90 }]} {...size}>
        <PieCenterLabel>Calories : {sumCalories}</PieCenterLabel>
      </PieChart>
    </div>
  );
}
