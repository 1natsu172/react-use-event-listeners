import {
  pickEventType,
  pickHandler,
  pickListenerOption,
  detectListenerOption,
  captureOption,
  checkArgs
} from './libs'

import { EventType, EventListeners } from './types/EventListeners'

export const useEventListeners = <K extends EventType>(
  eventTarget: EventTarget,
  eventListeners: EventListeners<K>
) => {
  checkArgs(eventListeners)

  const register = () =>
    eventListeners.forEach(eventListener => {
      const eventType = pickEventType(eventListener)
      const handler = pickHandler(eventListener)
      const pickedOption = pickListenerOption(eventListener)
      const listenerOption = detectListenerOption(pickedOption)

      eventTarget.addEventListener(eventType, handler, listenerOption)
    })

  const unRegister = () =>
    eventListeners.forEach(eventListener => {
      const eventType = pickEventType(eventListener)
      const handler = pickHandler(eventListener)
      const pickedOption = pickListenerOption(eventListener)
      const listenerOption = captureOption(pickedOption)

      eventTarget.removeEventListener(
        eventType,
        handler,
        listenerOption // c.f https://developer.mozilla.org/ja/docs/Web/API/EventTarget/removeEventListener
      )
    })

  return { register, unRegister }
}
