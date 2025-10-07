import type { LoopIntervals, WorkerMessage, WorkerResponse } from './GameLoopManager.ts'

const intervals: Partial<LoopIntervals> = {}

self.addEventListener('message', (e: MessageEvent<WorkerMessage>) => {
  const { command, loop, period } = e.data

  try {
    switch (command) {
      case 'start':
        if (!loop || !period) {
          throw new Error('loop and period are required for start command')
        }

        // Clear existing interval if present
        if (intervals[loop]) {
          clearInterval(intervals[loop])
        }

        intervals[loop] = setInterval(() => {
          const response: WorkerResponse = { type: 'tick', loop }
          self.postMessage(response)
        }, period)

        const startedResponse: WorkerResponse = { type: 'started', loop }
        self.postMessage(startedResponse)
        break

      case 'stop':
        if (!loop) {
          throw new Error('loop is required for stop command')
        }

        if (intervals[loop]) {
          clearInterval(intervals[loop])
          delete intervals[loop]
          const stoppedResponse: WorkerResponse = { type: 'stopped', loop }
          self.postMessage(stoppedResponse)
        }
        break

      case 'clear':
        // Clear all intervals
        (Object.keys(intervals) as Array<keyof LoopIntervals>).forEach((key) => {
          if (intervals[key]) {
            clearInterval(intervals[key])
            delete intervals[key]
          }
        })
        break
    }
  } catch (error) {
    const errorResponse: WorkerResponse = {
      type: 'error',
      loop,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
    self.postMessage(errorResponse)
  }
})
