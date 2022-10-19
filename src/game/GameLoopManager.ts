const Loops = {
  SHORT: 'short',
  MID: 'mid',
  LONG: 'long',
} as const

type LoopsValues = typeof Loops[keyof typeof Loops]

interface LoopIntervals {
  main_loop?: number
  mid_loop?: number
  long_loop?: number
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
    [Loops.SHORT]: SubscriptionCallback[]
    [Loops.MID]: SubscriptionCallback[]
    [Loops.LONG]: SubscriptionCallback[]
  } = {
    [Loops.SHORT]: [],
    [Loops.MID]: [],
    [Loops.LONG]: [],
  }

  constructor(options?: GameLoopOptions) {
    this.options = { ...defaultOptions, ...options }
    if (window.Worker && !this.webWorker && !this.options.disableWorker) {
      this.webWorker = new Worker(new URL('./LoopWorker.ts', import.meta.url))
      this.webWorker.addEventListener(
        'message',
        ({ data }: { data: LoopsValues }) => {
          switch (data) {
            case Loops.SHORT:
              this.fastLoop()
              break
            case Loops.MID:
              this.midLoop()
              break
            case Loops.LONG:
              this.longLoop()
              break
          }
        }
      )
    }
  }

  private fastLoop(): void {
    this.subscriptions[Loops.SHORT].forEach((cb) => {
      cb()
    }, this)
  }
  private midLoop(): void {
    this.subscriptions[Loops.MID].forEach((cb) => {
      cb()
    }, this)
  }
  private longLoop(): void {
    this.subscriptions[Loops.LONG].forEach((cb) => {
      cb()
    }, this)
  }

  public start(): void {
    if (this.isRunning) return
    this.isRunning = true

    if (this.webWorker) {
      this.webWorker.postMessage({
        loop: Loops.SHORT,
        period: this.options.shortTimer,
      })
      this.webWorker.postMessage({
        loop: Loops.MID,
        period: this.options.midTimer,
      })
      this.webWorker.postMessage({
        loop: Loops.LONG,
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

  public subscribe(loop: LoopsValues, callback: SubscriptionCallback): void {
    this.subscriptions[loop].push(callback)
  }

  public unsubscribe(loop: LoopsValues, callback: SubscriptionCallback): void {
    const index = this.subscriptions[loop].findIndex((cb) => callback === cb)
    if (index < 0) return
    delete this.subscriptions[loop][index]
  }
}
