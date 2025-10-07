type Loop = "short" | "mid" | "long";

export type LoopIntervals = Record<Loop, NodeJS.Timeout>;

export type WorkerCommand = "start" | "stop" | "clear";

export interface WorkerMessage {
  command: WorkerCommand;
  loop?: Loop;
  period?: number;
}

export interface WorkerResponse {
  type: "tick" | "error" | "started" | "stopped";
  loop?: Loop;
  error?: string;
}

export type SubscriptionCallback = () => void;
export type UnsubscribeFunction = () => void;

export interface GameLoopOptions {
  disableWorker: boolean;
  shortTimer: number;
  midTimer: number;
  longTimer: number;
}

const defaultOptions: GameLoopOptions = {
  disableWorker: import.meta.env.DEV,
  shortTimer: 250,
  midTimer: 1000,
  longTimer: 5000,
};

export default class GameLoopManager {
  public options: GameLoopOptions;
  private _isRunning: boolean = false;
  private webWorker?: Worker;
  private intervals: LoopIntervals | undefined;
  private stateChangeListeners: Set<() => void> = new Set();

  private subscriptions: {
    short: SubscriptionCallback[];
    mid: SubscriptionCallback[];
    long: SubscriptionCallback[];
  } = {
    short: [],
    mid: [],
    long: [],
  };

  constructor(options?: Partial<GameLoopOptions>) {
    this.options = { ...defaultOptions, ...options };

    // Validate timer values
    if (
      this.options.shortTimer <= 0 || this.options.midTimer <= 0 ||
      this.options.longTimer <= 0
    ) {
      throw new Error("Timer values must be greater than 0");
    }

    if (Worker && !this.webWorker && !this.options.disableWorker) {
      this.webWorker = new Worker(new URL("./LoopWorker.ts", import.meta.url));
      this.webWorker.addEventListener(
        "message",
        ({ data }: MessageEvent<WorkerResponse>) => {
          const response = data as WorkerResponse;

          switch (response.type) {
            case "tick":
              if (response.loop === "short") this.fastLoop();
              else if (response.loop === "mid") this.midLoop();
              else if (response.loop === "long") this.longLoop();
              break;
            case "error":
              console.error(
                `Worker error on ${response.loop} loop:`,
                response.error,
              );
              break;
            case "started":
            case "stopped":
              // Optional: handle acknowledgments if needed
              break;
          }
        },
      );
    }
  }

  private fastLoop(): void {
    this.subscriptions.short.forEach((cb) => {
      try {
        cb();
      } catch (error) {
        console.error("Error in short loop callback:", error);
      }
    });
  }
  private midLoop(): void {
    this.subscriptions.mid.forEach((cb) => {
      try {
        cb();
      } catch (error) {
        console.error("Error in mid loop callback:", error);
      }
    });
  }
  private longLoop(): void {
    this.subscriptions.long.forEach((cb) => {
      try {
        cb();
      } catch (error) {
        console.error("Error in long loop callback:", error);
      }
    });
  }

  public get isRunning(): boolean {
    return this._isRunning;
  }

  private notifyStateChange(): void {
    this.stateChangeListeners.forEach((listener) => listener());
  }

  public subscribeToStateChange(listener: () => void): () => void {
    this.stateChangeListeners.add(listener);
    return () => this.stateChangeListeners.delete(listener);
  }

  public start(): void {
    if (this._isRunning) return;
    this._isRunning = true;
    this.notifyStateChange();

    if (this.webWorker) {
      const shortMsg: WorkerMessage = {
        command: "start",
        loop: "short",
        period: this.options.shortTimer,
      };
      const midMsg: WorkerMessage = {
        command: "start",
        loop: "mid",
        period: this.options.midTimer,
      };
      const longMsg: WorkerMessage = {
        command: "start",
        loop: "long",
        period: this.options.longTimer,
      };

      this.webWorker.postMessage(shortMsg);
      this.webWorker.postMessage(midMsg);
      this.webWorker.postMessage(longMsg);
    } else {
      this.intervals = {
        short: setInterval(() => {
          this.fastLoop();
        }, this.options.shortTimer),
        mid: setInterval(() => {
          this.midLoop();
        }, this.options.midTimer),
        long: setInterval(() => {
          this.longLoop();
        }, this.options.longTimer),
      };
    }
  }

  public stop(): void {
    if (!this._isRunning) return;
    this._isRunning = false;
    this.notifyStateChange();

    if (this.webWorker) {
      const clearMsg: WorkerMessage = { command: "clear" };
      this.webWorker.postMessage(clearMsg);
    } else if (this.intervals) {
      clearInterval(this.intervals.short);
      clearInterval(this.intervals.mid);
      clearInterval(this.intervals.long);
      this.intervals = undefined;
    }
  }

  public subscribe(
    loop: Loop,
    callback: SubscriptionCallback,
  ): UnsubscribeFunction {
    this.subscriptions[loop].push(callback);
    return () => this.unsubscribe(loop, callback);
  }

  public unsubscribe(loop: Loop, callback: SubscriptionCallback): void {
    const index = this.subscriptions[loop].findIndex((cb) => callback === cb);
    if (index < 0) return;
    this.subscriptions[loop].splice(index, 1);
  }

  public destroy(): void {
    this.stop();
    this.subscriptions.short = [];
    this.subscriptions.mid = [];
    this.subscriptions.long = [];
    if (this.webWorker) {
      this.webWorker.terminate();
      this.webWorker = undefined;
    }
  }
}
