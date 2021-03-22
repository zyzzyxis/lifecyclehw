import React, { useState } from 'react'

function StepTracker() { 
  const [steps, setSteps] = useState(0)
  
  function increment() {
    setSteps(prevState => prevState +1)
  }

  return(
    <div>
      You've taken {steps} today!
      <br />
      <button onClick={increment}>
        I took another step
      </button>
    </div>
  )
}

ReactDOM.render(
  <StepTracker />,
  document.querySelector('#root')
)