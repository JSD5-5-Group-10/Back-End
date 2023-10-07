import React from "react";
import { Dashboard1 } from "../component/dashboard/Dashboard1";
import BasicStacking from "../component/dashboard/BasicStacking";
import StraightAnglePieChart from "../component/dashboard/StraightAnglePieChart";
import PieChartWithCenterLabel from "../component/dashboard/PieChartWithCenterLabel";
import { Chartsbar } from "../component/dashboard/Chartsbar";
import Navbar from "../component/Navbar";

export const Dashboard = () => {
  return (
    <div style={{ position: "relative" }}>
      <div className="z-50" style={{ position: "absolute", width: "100%" }}>
        <Navbar />
      </div>
      <div className="min-h-min" style={{ position: "relative", zIndex: "0" }}>
        <h1 className="text-center text-4xl font-bold py-10 text-[#131c85]">
          Dashboard
        </h1>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4">
          <PieChartWithCenterLabel />
          <StraightAnglePieChart />
          <Chartsbar />
          <BasicStacking />
          <Dashboard1 />
        </div>
      </div>
    </div>
  );
};
