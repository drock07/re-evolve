enum Loop {
  SHORT = 'short',
  MID = 'mid',
  LONG = 'long',
}
export interface LoopIntervals {
  main_loop?: number
  mid_loop?: number
  long_loop?: number
}

export interface LoopWorkerArguments {
  loop: Loop | 'clear'
  period: number
}

export type SubscriptionCallback = () => void

export interface GameLoopOptions {
  disableWorker: boolean
  shortTimer: number
  midTimer: number
  longTimer: number
}

const defaultOptions: GameLoopOptions = {
  disableWorker: false,
  shortTimer: 250,
  midTimer: 1000,
  longTimer: 5000,
}

export default class GameLoopManager {
  private options: GameLoopOptions
  private isRunning: boolean = false
  private webWorker?: Worker
  private intervals: LoopIntervals = {}

  private subscriptions: {
    [Loop.SHORT]: SubscriptionCallback[]
    [Loop.MID]: SubscriptionCallback[]
    [Loop.LONG]: SubscriptionCallback[]
  } = {
    [Loop.SHORT]: [],
    [Loop.MID]: [],
    [Loop.LONG]: [],
  }

  constructor(options?: GameLoopOptions) {
    this.options = { ...defaultOptions, ...options }
    if (window.Worker && !this.webWorker && !this.options.disableWorker) {
      this.webWorker = new Worker(new URL('./LoopWorker.ts', import.meta.url))
      this.webWorker.addEventListener('message', ({ data }: { data: Loop }) => {
        switch (data) {
          case Loop.SHORT:
            this.fastLoop()
            break
          case Loop.MID:
            this.midLoop()
            break
          case Loop.LONG:
            this.longLoop()
            break
        }
      })
    }
  }

  private fastLoop(): void {
    this.subscriptions[Loop.SHORT].forEach((cb) => {
      cb()
    }, this)
  }
  private midLoop(): void {
    this.subscriptions[Loop.MID].forEach((cb) => {
      cb()
    }, this)
  }
  private longLoop(): void {
    this.subscriptions[Loop.LONG].forEach((cb) => {
      cb()
    }, this)
  }

  public start(): void {
    if (this.isRunning) return
    this.isRunning = true

    if (this.webWorker) {
      this.webWorker.postMessage({
        loop: Loop.SHORT,
        period: this.options.shortTimer,
      })
      this.webWorker.postMessage({
        loop: Loop.MID,
        period: this.options.midTimer,
      })
      this.webWorker.postMessage({
        loop: Loop.LONG,
        period: this.options.longTimer,
      })
    } else {
      this.intervals.main_loop = setInterval(() => {
        this.fastLoop()
      }, this.options.shortTimer)
      this.intervals.mid_loop = setInterval(() => {
        this.midLoop()
      }, this.options.midTimer)
      this.intervals.long_loop = setInterval(() => {
        this.longLoop()
      }, this.options.longTimer)
    }
  }

  public stop(): void {
    if (!this.isRunning) return
    this.isRunning = false

    if (this.webWorker) {
      this.webWorker.postMessage({ loop: 'clear' })
    } else {
      clearInterval(this.intervals.main_loop)
      clearInterval(this.intervals.mid_loop)
      clearInterval(this.intervals.long_loop)
    }
  }

  public subscribe(loop: Loop, callback: SubscriptionCallback): void {
    this.subscriptions[loop].push(callback)
  }

  public unsubscribe(loop: Loop, callback: SubscriptionCallback): void {
    const index = this.subscriptions[loop].findIndex((cb) => callback === cb)
    if (index < 0) return
    delete this.subscriptions[loop][index]
  }
}
