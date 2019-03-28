import { useEffect, DependencyList } from 'react'
import {
  registerEventListeners,
  EventType,
  EventListeners
} from 'register-event-listeners'

type Values<U extends EventType> = {
  eventTarget?: EventTarget | null
  listeners: EventListeners<U>
}

export const useEventListeners = <U extends EventType>(
  { eventTarget, listeners }: Values<U>,
  deps?: DependencyList
) => {
  useEffect(() => {
    if (eventTarget) {
      const { register, unRegister } = registerEventListeners(
        eventTarget,
        listeners
      )
      register()
      return unRegister
    }
    return undefined
  }, deps)
}
