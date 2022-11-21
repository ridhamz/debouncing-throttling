# Debouncing and Throttling

A simple project that implements debouncing and throttling to improve the performance of a react application.


# Introduction

Hello, community 🙌🏻,

In order to build a professional web application, optimization and performance are two important things you need to care about.

There are many tips and techniques used to increase the performance of a web application, such as Debouncing and Throttling.

When it comes to debouncing and throttling, developers often confuse.

During this blog, I will go throw these two techniques in details using react.js, but it is the same principle for vanilla JavaScript or any other JavaScript framework.

# Debouncing

Before dive deep into debouncing, let's see a simple and normal example that implement a search box that allows users to search something without clicking any button.

```js
function App() {
  const handleChange = (e) => {
    console.log('api call...')
  }

  return (
    <div className="App">
      <header className="App-header">
        <p> Search </p>
        <input type="text" onChange={handleChange} />
      </header>
    </div>
  )
}
```

The issue is that handleChange is very expensive, and this is bad to the server because it will receive many HTTP requests in the same time.

![Maple](/static/images/r-d-t/0.gif)

To solve the problem, we need to use a debounce function.

Definition and implementation of a debounce function
A debounce function is called after a specific amount of time passes since its last call.

```js
function debounce(fn, delay) {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(()=>fn(...args), delay)
    }
```

The idea is to define a high-order function called debounce takes as arguments a callback function and a delay in ms, then returns a new function that sets the timer to execute the callback after the timer done.
The secret here is that every call of the function returned from the debounce function will cancel the previous timer using cleartimeout(timer) and start a new timer.
With this approach, we can be sure that the callback function will be executed just once after the time that we passed as an argument in the last call.

# Implement debounce function into our example

```js
<div className="App">
  <header className="App-header">
    <p> Search </p>
    <input type="text" onChange={debounce(handleChange, 500)} />
  </header>
</div>
```

## Result

![Maple](/static/images/r-d-t/1.gif)

# Throttling

Let's assume that we have an event listener in our app to track the movement of the user mouse, then send data to a backend server to do some operations based on the location of the mouse.

```js
const handleMouseMove = (e) => {
  //everytime the mouse moved this function will be invoked
  console.log('api call to do some operations...')
}
//event listener to track the movement of the mouse
window.addEventListener('mousemove', handleMouseMove)
```

If we stick with this solution, we will end up with a down backend server because it will receive a hundred of requests in short duration.

![Maple](/static/images/r-d-t/2.gif)

1600 API calls in few seconds is very very bad 📛📛📛.
To fix this issue, we need to limit the number of API calls, and this kind of problems can be solved using a throttle function.

# Definition and implementation of a throttle function

A throttle function is a mechanism to limit the number of calls of another function in a specific interval, any additional calls within the specified time interval will be ignored.

```js
function throttle(fn, delay) {
  let run = false
  return function (...args) {
    if (!run) {
      fn(...args)
      run = true
      setTimeout(() => (run = false), delay)
    }
  }
}
```

The throttle function accepts two arguments: fn, which is a function to throttle, and delay in ms of the throttling interval and returns a throttled function.

# Implement throttle function into our example

```js
const handleMouseMove = (e) => {
  //everytime the mouse moved this function will be invoked
  console.log('api call to do some operations...')
}

//event listener to track the movement of the mouse
window.addEventListener('mousemove', throttle(handleMouseMove, 1000))
//1000ms => 1 second
```

## Result

![Maple](/static/images/r-d-t/3.gif)

# Conclusion

Debouncing and Throttling are two amazing techniques, they can increase the performance of your web application to another level.
Choosing one of them depends on the case.

GitHub repo: https://github.com/ridhamz/debouncing-throttling


