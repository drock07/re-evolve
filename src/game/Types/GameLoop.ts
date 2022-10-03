export const Loops = {
  SHORT: "short",
  MID: "mid",
  LONG: "long",
} as const;

export type LoopsValues = typeof Loops[keyof typeof Loops];

export interface LoopIntervals {
  main_loop?: number;
  mid_loop?: number;
  long_loop?: number;
}

export interface LoopWorkerArguments {
  loop: LoopsValues | "clear";
  period: number;
}
