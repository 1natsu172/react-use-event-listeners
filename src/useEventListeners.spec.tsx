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

test('Should work properly DependencyList(2nd argument array)', () => {
  const { getByTestId } = render(<TestComponent />)
  const displayCountEl = getByTestId('displayCountEl')
  const displayEnableEventTarget = getByTestId('displayEnableEventTarget')
  const eventTargetEl1 = getByTestId('eventTargetEl1')
  const eventTargetEl2 = getByTestId('eventTargetEl2')
  const toggleEventTargetButton = getByTestId('toggleEventTargetButton')

  expect(displayEnableEventTarget.textContent).toBe(
    eventTargetEl1.dataset.testid
  )

  // should work event listener on El1
  for (let index = 0; index < 5; index += 1) {
    fireEvent.click(eventTargetEl1)
  }
  expect(displayCountEl.textContent).toBe('5')

  // should not work on El2(expect cleanuped)
  fireEvent.click(eventTargetEl2)
  expect(displayCountEl.textContent).toBe('5')

  // Change target to El2
  fireEvent.click(toggleEventTargetButton)
  expect(displayEnableEventTarget.textContent).toBe(
    eventTargetEl2.dataset.testid
  )

  // Should not work on El1(expect cleanuped)
  fireEvent.click(eventTargetEl1)
  expect(displayCountEl.textContent).toBe('5')

  // should work event listener on El2
  for (let index = 0; index < 5; index += 1) {
    fireEvent.click(eventTargetEl2)
  }
  expect(displayCountEl.textContent).toBe('10')

  // Re-Change target to El1
  fireEvent.click(toggleEventTargetButton)
  expect(displayEnableEventTarget.textContent).toBe(
    eventTargetEl1.dataset.testid
  )

  // should not work on El2(expect cleanuped)
  fireEvent.click(eventTargetEl2)
  expect(displayCountEl.textContent).toBe('10')

  // should work event listener on El1
  for (let index = 0; index < 5; index += 1) {
    fireEvent.click(eventTargetEl1)
  }
  expect(displayCountEl.textContent).toBe('15')
})
