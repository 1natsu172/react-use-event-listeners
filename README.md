[![](https://img.shields.io/npm/v/react-use-event-listeners.svg?style=for-the-badge&logo=npm&colorB=cc3534)](https://www.npmjs.com/package/react-use-event-listeners)
[![](https://img.shields.io/npm/types/react-use-event-listeners.svg?style=for-the-badge&logo=typescript&colorB=007acc)](https://www.npmjs.com/package/react-use-event-listeners)
[![](https://img.shields.io/circleci/project/github/1natsu172/react-use-event-listeners/master.svg?style=for-the-badge&logo=circleci&colorB=00992B)](https://circleci.com/gh/1natsu172/react-use-event-listeners)
![Codecov](https://img.shields.io/codecov/c/github/1natsu172/react-use-event-listeners.svg?color=%23FF2F6B&logo=codecov&style=for-the-badge)

# react-use-event-listeners

**Handling the addEventListener(s) using the hooks.**

Useful for listening to events that are not synthetic-events.

---
_This hook is for 1-EventTarget:multi event listeners, so not for multi-targets:multi event listeners._

## ✨ Getting Started

with **yarn**

```bash
yarn add react-use-event-listeners
```

or

with **npm**

```bash
npm install react-use-event-listeners
```

## 💁 Usage

example component is count-up button app

```javascript
const CountUpApp = () => {
  const eventTargetRef = useRef(null)
  
  const countUp = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const handleOver = useCallback(() => {
    console.log('user will click count-up button')
  }, [])

  useEventListeners(
    {
      eventTarget: eventTargetRef.current,
      listeners: [
        ['click', countUp],
        ['pointerover', handleOver],
      ]
    },
    [eventTargetRef.current]
  )

  return (
    <>
      <div className="displayCount">{count}</div>
      <div className="countUpButton" ref={eventTargetRef}>
        Click then count up
      </div>
    </>
  )
}
```

## 🔥 APIs

### `useEventListeners(values, dependencyList)`

| name           | require |  type  | default | decstiption                                                                                                                                       |
| -------------- | :-----: | :----: | :-----: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| values         |    ✓    | Object |    -    | See below                                                                                                                                         |
| dependencyList |    -    | Array  |    -    | [About React hooks 2nd argument array(DependencyList)](https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) |

#### About the 1st argument object(values)

| name        | require |    type     | default | decstiption                                                                                                         |
| ----------- | :-----: | :---------: | :-----: | ------------------------------------------------------------------------------------------------------------------- |
| eventTarget |    -    | EventTarget |    -    | [MDN - EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)                                   |
| listeners   |    ✓    |    Array    |    -    | [README - register-event-listeners](https://github.com/1natsu172/register-event-listeners#the-element-of-the-array) |

##### What's listeners?

The listeners are the same format as dependency module [register-event-listeners](https://github.com/1natsu172/register-event-listeners). Please refer to that document for details.

> https://github.com/1natsu172/register-event-listeners#the-element-of-the-array

##### So, the 1st argument should be like this.

```javascript
{
  eventTarget: eventTargetRef.current,
  listeners:[
    ['touchstart', onTouchStart, {capture: true, once: true}],
    ['touchmove', onTouchMove, { passive: false }],
    ['touchend', onEnd],
    ['touchcancel', onEnd]
  ]
}
```

## 💚 Running the tests

with [Jest](https://jestjs.io/).

```bash
yarn test
```
or

```bash
npm run test
```

<!-- 
## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. -->

## 🏷 Versioning

Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/1natsu172/handy-media-query/tags). 

## ©️ License

MIT © [1natsu172](https://github.com/1natsu172)
