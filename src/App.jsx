import { Canvas } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Scene } from './Scene'
import { OrbitControls } from '@react-three/drei'

const App = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const ref = useRef()

  return (
    <>
      <button onClick={() => setX((previous) => previous - 0.1)}>Left</button>
      <button onClick={() => setX((previous) => previous + 0.1)}>Right</button>
      <button onClick={() => setY((previous) => previous + 0.1)}>Up</button>
      <button onClick={() => setY((previous) => previous - 0.1)}>Down</button>
      <button onClick={() => {
        setY(0)
        setX(0)
        ref.current.reset()
      }}>Reset</button>
      <Canvas style={{ height: '90vh'}} camera={{ position: [0, 0, 4], fov: 50 }}>
        <Scene x={x} y={y} />
        <OrbitControls ref={ref} />
      </Canvas>
    </>
  )
}

export default App
