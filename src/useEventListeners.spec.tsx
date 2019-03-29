import React, { useCallback, useState, useRef, FC } from 'react'
import { fireEvent, render, cleanup } from 'react-testing-library'
import { useEventListeners } from './useEventListeners'

const TestComponent: FC = () => {
  const [count, setCount] = useState(0)

  const eventTargetRef = useRef<HTMLDivElement>(null)

  const countUp = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  useEventListeners(
    {
      eventTarget: eventTargetRef.current,
      listeners: [['click', countUp]]
    },
    [eventTargetRef.current]
  )

  return (
    <>
      <div data-testid="displayCountEl">{count}</div>
      <div data-testid="eventTargetEl" ref={eventTargetRef}>
        Click then count up
      </div>
    </>
  )
}

afterEach(cleanup)

test('Should be properly processed the same as useEffect hooks', () => {
  const { rerender, unmount, getByTestId } = render(<TestComponent />)
  const displayCountEl = getByTestId('displayCountEl')
  const eventTargetEl = getByTestId('eventTargetEl')

  fireEvent.click(eventTargetEl)

  expect(displayCountEl.textContent).toBe('0')

  /**
   * Force execute useEffect().
   * The method for activating effects after render has not been established yet……need some hack for `act()` or something.
   * Related Issue: https://github.com/kentcdodds/react-testing-library/issues/215
   * So here we use `rerender` to force useEffect.
   */
  rerender(<TestComponent />)

  fireEvent.click(eventTargetEl)

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
