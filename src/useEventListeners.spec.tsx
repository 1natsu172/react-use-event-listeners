import React, { useCallback, useState, useRef, FC } from 'react'
import { fireEvent, render, cleanup } from 'react-testing-library'
import { useEventListeners } from './useEventListeners'

const MockComponent: FC = () => {
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

test('testing', () => {
  const { rerender, unmount, getByTestId } = render(<MockComponent />)
  const displayCountEl = getByTestId('displayCountEl')
  const eventTargetEl = getByTestId('eventTargetEl')
  rerender(<MockComponent />)

  fireEvent.click(eventTargetEl)

  expect(displayCountEl.textContent).toBe('1')

  fireEvent.click(eventTargetEl)

  expect(displayCountEl.textContent).toBe('2')

  fireEvent.click(eventTargetEl)
  fireEvent.click(eventTargetEl)

  expect(displayCountEl.textContent).toBe('4')

  unmount()

  fireEvent.click(eventTargetEl)

  expect(displayCountEl.textContent).toBe('4')

  fireEvent.click(eventTargetEl)
  fireEvent.click(eventTargetEl)
  fireEvent.click(eventTargetEl)
  fireEvent.click(eventTargetEl)

  expect(displayCountEl.textContent).toBe('4')
})
