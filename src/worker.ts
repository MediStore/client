import eventsInstance from './events'
import decrypt from './utils/jwt'

import { getSessionToken } from './session'

import { TEST_ENV } from './utils'

// Use window.SharedWorker

(function () {

  if (window.Worker) try {

    const worker = new Worker('worker.js')
    const token = getSessionToken()

    if (token === null) return

    const { id } = decrypt(token)

    worker.postMessage({ token: id })

    worker.onmessage = function (e) {
      const { action, result } = e.data
      eventsInstance.emit(action, result)
    }

  } catch (error) {
    console.error('Worker script failed', error)
  } else if (process.env.NODE_ENV !== TEST_ENV) {
    console.error('Worker not supported')
  }

})()