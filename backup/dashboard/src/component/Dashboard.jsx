import React from 'react'
import { Dashboard1 } from './dashboard/Dashboard1'
import BasicStacking from './dashboard/BasicStacking'
import StraightAnglePieChart from './dashboard/StraightAnglePieChart'
import PieChartWithCenterLabel from './dashboard/PieChartWithCenterLabel'
import { Chartsbar } from './dashboard/Chartsbar'

export const Dashboard = () => {
  return (
    <div className='grid grid-cols-1 gap-4 bg-gray-200 justfy-center'>
         <h1 className=' text-center text-2xl my-10'>Dashboard</h1>
        <Dashboard1 />
        <PieChartWithCenterLabel/>
        <BasicStacking />
        <StraightAnglePieChart/>
        <Chartsbar/>
    </div>
  )
}
