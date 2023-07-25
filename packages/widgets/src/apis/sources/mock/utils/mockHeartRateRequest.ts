const ONE_HOUR_MS = 3600000;
const BPMs = [
  85, 120, 90, 95, 63, 75, 70, 140, 80, 60, 65, 100, 94, 88, 90, 58, 65, 71, 78,
  65, 67, 57, 61,
];

export const heartRateData = {
  id: 'heart-rate',
  data: BPMs.map((bpm, index) => ({
    x: Date.now() - ONE_HOUR_MS * (BPMs.length - index - 1),
    y: bpm,
  })),
};
