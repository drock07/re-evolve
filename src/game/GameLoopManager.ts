type Loop = 'short' | 'mid' | 'long'
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
  public options: GameLoopOptions
  private isRunning: boolean = false
  private webWorker?: Worker
  private intervals: LoopIntervals = {}

  private subscriptions: {
    short: SubscriptionCallback[]
    mid: SubscriptionCallback[]
    long: SubscriptionCallback[]
  } = {
    short: [],
    mid: [],
    long: [],
  }

  constructor(options?: GameLoopOptions) {
    this.options = { ...defaultOptions, ...options }
    if (Worker && !this.webWorker && !this.options.disableWorker) {
      this.webWorker = new Worker(new URL('./LoopWorker.ts', import.meta.url))
      this.webWorker.addEventListener('message', ({ data }: { data: Loop }) => {
        switch (data) {
          case 'short':
            this.fastLoop()
            break
          case 'mid':
            this.midLoop()
            break
          case 'long':
            this.longLoop()
            break
        }
      })
    }
  }

  private fastLoop(): void {
    this.subscriptions.short.forEach((cb) => {
      cb()
    }, this)
  }
  private midLoop(): void {
    this.subscriptions.mid.forEach((cb) => {
      cb()
    }, this)
  }
  private longLoop(): void {
    this.subscriptions.long.forEach((cb) => {
      cb()
    }, this)
  }

  public start(): void {
    if (this.isRunning) return
    this.isRunning = true

    if (this.webWorker) {
      this.webWorker.postMessage({
        loop: 'short',
        period: this.options.shortTimer,
      })
      this.webWorker.postMessage({
        loop: 'mid',
        period: this.options.midTimer,
      })
      this.webWorker.postMessage({
        loop: 'long',
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
