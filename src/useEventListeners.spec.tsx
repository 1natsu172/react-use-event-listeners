import React, { useCallback, useState, useRef, FC, useEffect } from 'react'
import { fireEvent, render, cleanup } from 'react-testing-library'
import { useEventListeners } from './useEventListeners'

const TestComponent: FC = () => {
  const [count, setCount] = useState(0)
  const [eventTarget, setEventTarget] = useState<HTMLDivElement | null>(null)

  const eventTargetEl1 = useRef<HTMLDivElement>(null)
  const eventTargetEl2 = useRef<HTMLDivElement>(null)

  const countUp = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const toggleEventTarget = useCallback(() => {
    setEventTarget(prevTarget =>
      prevTarget === eventTargetEl1.current
        ? eventTargetEl2.current
        : eventTargetEl1.current
    )
  }, [eventTarget])

  // initializing Ref EventTarget
  useEffect(() => {
    setEventTarget(eventTargetEl1.current)
  }, [])

  useEventListeners(
    {
      eventTarget,
      listeners: [['click', countUp]]
    },
    [eventTarget]
  )

  return (
    <>
      <div data-testid="displayCountEl">{count}</div>
      <div data-testid="displayEnableEventTarget">
        {eventTarget ? eventTarget.dataset.testid : null}
      </div>
      <div data-testid="eventTargetEl1" ref={eventTargetEl1}>
        eventTargetEl1: Click then count up
      </div>
      <div data-testid="eventTargetEl2" ref={eventTargetEl2}>
        eventTargetEl2: Click then count up
      </div>
      <button
        data-testid="toggleEventTargetButton"
        onClick={toggleEventTarget}
        type="button"
      >
        Change EventTarget
      </button>
    </>
  )
}

afterEach(cleanup)

test('Should be properly processed the same as useEffect hooks', () => {
  const { unmount, getByTestId } = render(<TestComponent />)
  const displayCountEl = getByTestId('displayCountEl')
  const eventTargetEl = getByTestId('eventTargetEl1')

  for (let index = 0; index < 5; index += 1) {
  fireEvent.click(eventTargetEl)
  }
  expect(displayCountEl.textContent).toBe('5')

  unmount()

  // Should not work on El1(expect cleanuped)
  for (let index = 0; index < 5; index += 1) {
  fireEvent.click(eventTargetEl)
  }
  expect(displayCountEl.textContent).toBe('5')
})

  expect(displayCountEl.textContent).toBe('1')

  for (let index = 0; index < 5; index += 1) {
    fireEvent.click(eventTargetEl)
  }

  expect(displayCountEl.textContent).toBe('6')

  unmount()

  for (let index = 0; index < 5; index += 1) {
    fireEvent.click(eventTargetEl)
  }

  expect(displayCountEl.textContent).toBe('6')
})
