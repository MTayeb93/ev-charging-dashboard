 import { ChargeEvent } from "../data/dummyData";

export type AggregationType = "15min" | "hourly";

export const aggregateChargingData = (
  data: ChargeEvent[],
  type: AggregationType
): { label: string; total: number }[] => {
  const grouped: { [key: string]: number } = {};

  for (const event of data) {
    const label = type === "15min"
      ? event.time
      : event.time.slice(0, 2) + ":00";

    grouped[label] = (grouped[label] || 0) + event.power;
  }

  return Object.entries(grouped).map(([label, total]) => ({ label, total }));
};
