import {
 Chart as ChartJS,
 Tooltip,
 Legend,
 LinearScale,
 CategoryScale,
 Title,
} from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import { FC, useMemo } from "react";
import { generateHeatmapData, HeatmapDataPoint } from "../../../data/dummyData";

ChartJS.register(
 MatrixController,
 MatrixElement,
 Tooltip,
 Legend,
 LinearScale,
 CategoryScale,
 Title
);

export const HeatmapChargepointUsage: FC = () => {
 const heatmapData: HeatmapDataPoint[] = useMemo(() => generateHeatmapData(), []);

 const xLabels = [...new Set(heatmapData.map((d) => d.x))];
 const yLabels = [...new Set(heatmapData.map((d) => d.y))];

 const matrixData = heatmapData
 .sort((a, b) => {
   if (a.y === b.y) {
     return xLabels.indexOf(a.x) - xLabels.indexOf(b.x);
   }
   return yLabels.indexOf(a.y) - yLabels.indexOf(b.y);
 })
 .map((d) => ({
   x: d.x, // column: time: hour
   y: d.y, // row: CP
   v: d.v,

 }));

 const chartData = {
   labels: {
     x: xLabels,
     y: yLabels,
   },
   datasets: [
     {
       label: "kW per Chargepoint",
       data: matrixData,
       backgroundColor: (ctx: any) => {
         const val = ctx.dataset.data[ctx.dataIndex].v;
         const alpha = val / 11;
         return `rgba(22, 163, 74, ${alpha})`;
       },
       borderWidth: 1,
       borderColor: "rgba(0, 0, 0, 0.05)",
       width: (ctx: any) => {
         const chart = ctx.chart;
         if (!chart.chartArea) return 10;
         return chart.chartArea.width / xLabels.length;
       },
       height: (ctx: any) => {
         const chart = ctx.chart;
         if (!chart.chartArea) return 10;
         return chart.chartArea.height / yLabels.length;
       },
     },
   ],
 };

 const options = {
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
     legend: { display: false },
     title: {
       display: true,
       text: "Chargepoint Power Usage Heatmap (kW per Hour)",
     },
     tooltip: {
       callbacks: {
         title: (items: any) => `Time: ${items[0].raw.x}`,
         label: (item: any) =>
           `Chargepoint: ${item.raw.y} — ${item.raw.v} kW`,
       },
     },
   },
   scales: {
     x: {
       type: "category" as const,
       labels: xLabels,
       title: {
         display: true,
         text: "Hour of Day",
       },
       offset: true,
       grid: { display: false },
     },
     y: {
       type: "category" as const,
       labels: yLabels,
       title: {
         display: true,
         text: "Chargepoint ID",
       },
       offset: true,
       grid: { display: false },
     },
   },
 };

 return (
   <div className=" bg-white rounded-2xl w-full">
     <div className="h-[600px] overflow-auto">
       <Chart key="cp-heatmap" type="matrix" data={chartData} options={options} />
     </div>
   </div>
 );
};
