export type TimeSeriesDataPoint = {
  time: string;
  chargepoints: {
    [chargepointId: string]: number;
  };
};

// 1 day of 15-minute intervals (7 sample points only to keep it short)
export const chargingTimeSeriesData: TimeSeriesDataPoint[] = [
  {
    time: "00:00",
    chargepoints: {
      "CP-1": 0,
      "CP-2": 2.5,
      "CP-3": 0,
    },
  },
  {
    time: "00:15",
    chargepoints: {
      "CP-1": 1.2,
      "CP-2": 3.4,
      "CP-3": 0,
    },
  },
  {
    time: "00:30",
    chargepoints: {
      "CP-1": 2.4,
      "CP-2": 4.8,
      "CP-3": 0.6,
    },
  },
  {
    time: "00:45",
    chargepoints: {
      "CP-1": 4.6,
      "CP-2": 5.0,
      "CP-3": 1.1,
    },
  },
  {
    time: "01:00",
    chargepoints: {
      "CP-1": 6.5,
      "CP-2": 6.0,
      "CP-3": 2.4,
    },
  },
  {
    time: "01:15",
    chargepoints: {
      "CP-1": 5.2,
      "CP-2": 4.2,
      "CP-3": 3.6,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 2.5,
      "CP-3": 4.8,
    },
  },
  {
    time: "01:30",
    chargepoints: {
      "CP-1": 3.4,
      "CP-2": 10,
      "CP-3": 9,
    },
  },
];


export type ChargeEvent = {
  time: string; // "HH:mm"
  chargepoint: string;
  power: number; // kW during that interval
};

export const chargingEvents: ChargeEvent[] = [];

const chargepoints = Array.from({ length: 10 }, (_, i) => `CP-${i + 1}`);
const intervals = Array.from({ length: 96 }, (_, i) => {
  const h = Math.floor(i / 4).toString().padStart(2, "0");
  const m = ((i % 4) * 15).toString().padStart(2, "0");
  return `${h}:${m}`;
});

for (const cp of chargepoints) {
  for (const time of intervals) {
    const isActive = Math.random() > 0.3; // 70% chance of usage
    const power = isActive ? Math.floor(Math.random() * 10 + 1) : 0;
    chargingEvents.push({ time, chargepoint: cp, power });
  }
}

export type HeatmapDataPoint = {
  x: string; // time label (e.g. "08:00")
  y: string; // chargepoint ID (e.g. "CP-1")
  v: number; // kW usage (0–11)
};

export const generateHeatmapData = (): HeatmapDataPoint[] => {
  const data: HeatmapDataPoint[] = [];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
  const cps = Array.from({ length: 15 }, (_, i) => `CP-${i + 1}`);

  for (const cp of cps) {
    for (const hour of hours) {
      const usage = Math.floor(Math.random() * 12); // 0–11 kW
      data.push({ x: hour, y: cp, v: usage });
    }
  }
  return data;
};






