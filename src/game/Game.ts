import {
  Loops,
  type LoopsValues,
  type LoopIntervals,
  type LoopWorkerArguments,
} from "./Types/GameLoop";

export interface GameOptions {
  disableWorker: boolean;
}

const defaultOptions: GameOptions = {
  disableWorker: false,
};

export default class Game {
  private isRunning: boolean = false;
  private webWorker?: Worker;
  private intervals: LoopIntervals = {};

  constructor(options?: GameOptions) {
    options = { ...defaultOptions, ...options };
    if (window.Worker && !this.webWorker && !options.disableWorker) {
      this.webWorker = new Worker(new URL("./LoopWorker.ts", import.meta.url));
      this.webWorker.addEventListener(
        "message",
        ({ data }: { data: LoopsValues }) => {
          switch (data) {
            case Loops.SHORT:
              this.fastLoop();
              break;
            case Loops.MID:
              this.midLoop();
              break;
            case Loops.LONG:
              this.longLoop();
              break;
          }
        }
      );
    }
  }

  private fastLoop(): void {
    console.log("fast loop");
  }
  private midLoop(): void {
    console.log("mid loop");
  }
  private longLoop(): void {
    console.log("long loop");
  }

  public start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log("starting game");

    let mainTimer = 250;
    let midTimer = 1000;
    let longTimer = 5000;

    if (this.webWorker) {
      this.webWorker.postMessage({ loop: Loops.SHORT, period: mainTimer });
      this.webWorker.postMessage({ loop: Loops.MID, period: midTimer });
      this.webWorker.postMessage({ loop: Loops.LONG, period: longTimer });
    } else {
      this.intervals.main_loop = setInterval(() => {
        this.fastLoop();
      }, mainTimer);
      this.intervals.mid_loop = setInterval(() => {
        this.midLoop();
      }, midTimer);
      this.intervals.long_loop = setInterval(() => {
        this.longLoop();
      }, longTimer);
    }
  }

  public stop(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    console.log("stopping game");

    if (this.webWorker) {
      this.webWorker.postMessage({ loop: "clear" });
    } else {
      clearInterval(this.intervals.main_loop);
      clearInterval(this.intervals.mid_loop);
      clearInterval(this.intervals.long_loop);
    }
  }
}
