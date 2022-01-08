import './App.css';

function App() {

  const handleChange = e => {
    console.log('api call...')
  }
  
  //debounce function
  function debounce(fn, delay) {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(()=>fn(...args), delay)
    }
  }
//throttle function
  function throttle(func, delay) {
    let run = false
    return function (...args) {
      if (!run) {
        func(...args)
        run = true
        setTimeout(() => run = false, delay)
      }
    }
  }

  const handleMouseMove = e => {
      //every time the mouse moved this function will be invoked
      console.log('api call to do some operations...')
  }
   
  //event listener to track the movement of the mouse
 window.addEventListener('mousemove', throttle(handleMouseMove, 1000))
   
  return (
    <div className="App">
      <header className="App-header">
        <p> Search  </p>
        <input type='text' onChange={debounce(handleChange, 500)} />
      </header>
    </div>
  );
}

export default App;
