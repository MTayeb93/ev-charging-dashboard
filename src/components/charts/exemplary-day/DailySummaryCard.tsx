import { FC } from "react";
import { Zap, BarChart3, Gauge, BatteryCharging, ClipboardList } from "lucide-react";
import DashboardCard from "../../common/DashboardCard";

// Dummy values
const TOTAL_KWH = 624;
const MAX_KW = 162;
const INTERVALS = 24; // hourly intervals
const MAX_THEORETICAL_KW = 11 * 20; // 20 chargepoints × 11kW

const UTILIZATION_PERCENT = Math.round(
  (MAX_KW * INTERVALS) / (MAX_THEORETICAL_KW * INTERVALS) * 100
);

const mostUsed = [
  { id: "CP-4", kWh: 73 },
  { id: "CP-9", kWh: 65 },
  { id: "CP-2", kWh: 61 },
];

const leastUsed = [
  { id: "CP-11", kWh: 12 },
  { id: "CP-5", kWh: 19 },
  { id: "CP-13", kWh: 20 },
];

export const DailySummaryCards: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {/* Max Power Demand */}
      <DashboardCard title="Peak Power Demand" icon={<Zap className="text-yellow-500" />}>         
        <span className="text-2xl font-semibold">{MAX_KW} kW</span>
        <p className="text-sm text-gray-500">Highest load during the day</p>
      </DashboardCard>

      {/* Total Energy */}
      <DashboardCard title="Total Energy Delivered" icon={<BatteryCharging className="text-green-600" />}>         
        <span className="text-2xl font-semibold">{TOTAL_KWH} kWh</span>
        <p className="text-sm text-gray-500">Sum of all chargepoints today</p>
      </DashboardCard>

      {/* Utilization Rate */}
      <DashboardCard title="Avg. Utilization Rate" icon={<Gauge className="text-blue-600" />}>         
        <span className="text-2xl font-semibold">{UTILIZATION_PERCENT}%</span>
        <p className="text-sm text-gray-500">of max theoretical power</p>
      </DashboardCard>

      {/* Most/Least Used Chargepoints */}
      <DashboardCard title="Most & Least Used CPs" icon={<BarChart3 className="text-purple-500" />}>         
        <div className="flex gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Most Used</p>
            {mostUsed.map((cp) => (
              <p key={cp.id}>{cp.id}: {cp.kWh} kWh</p>
            ))}
          </div>
          <div>
            <p className="font-medium text-gray-700">Least Used</p>
            {leastUsed.map((cp) => (
              <p key={cp.id}>{cp.id}: {cp.kWh} kWh</p>
            ))}
          </div>
        </div>
      </DashboardCard>

      {/* Session Summary */}
      <DashboardCard title="Session Summary" icon={<ClipboardList className="text-gray-700" />}>         
        <p className="text-sm text-gray-700">
          This exemplary day includes <strong>132</strong> total charging sessions with an average session size of <strong>4.7 kWh</strong> and an average duration of <strong>43 minutes</strong>.
        </p>
      </DashboardCard>
    </div>
  );
};
