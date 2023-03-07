import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

export const Scene = ({ x, y }) => {
  const [clicked, setClicked] = useState(false)
  const { nodes } = useGLTF('/model.glb')
  const ref = useRef()
  const { clock } = useThree()

  useFrame((state) => {
    if (!state.clock.running || !clicked) {
      return
    }

    const time = state.clock.getElapsedTime()

    if (time < 5) {
      ref.current.rotation.x = Math.PI / 2.5 * time
    } else {
      state.clock.stop()
      setClicked(false)
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 4, 4]} />
      <group
        rotate
        ref={ref}
        position={[x, y, 0]}
        onClick={(event) => {
          event.stopPropagation()
          setClicked((previous) => !previous)
          clock.start()
        }} dispose={null}
      >
        <mesh geometry={nodes.Cap.geometry} position={[0, 1, 0]}>
          <meshStandardMaterial color={clicked ? 'red' : 'pink'} />
        </mesh>
        <mesh geometry={nodes.Jar.geometry} position={[0, 0, 0]}>
          <meshStandardMaterial color={clicked ? 'red' : 'pink'} />
        </mesh>
      </group>
    </>
  )
}
