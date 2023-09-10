import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ShowModel from './components/ShowModel/ShowModel.jsx'
import ModelOptions from './components/ModelOptions/ModelOptions'
import { createPortal } from 'react-dom'

function App() {
  const [options, setOptions] = useState({radius:4, height:4, 
    radialSegments:4})

  return (
    <>
      {createPortal(<ModelOptions setOptions={setOptions}/>, document.body)}
      <ShowModel options={options}/>
    </>
  )
}

export default App
