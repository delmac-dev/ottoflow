import { AppShell } from '@mantine/core'
import React from 'react'
import Canvas from './canvas';
import { useElementSize } from '@mantine/hooks';

export default function Designer() {
  const { ref, width, height } = useElementSize();

  return (
    <AppShell.Main ref={ref} pos={"relative"}>
      <Canvas {...{width: width - 300, height: height - 68}} />
    </AppShell.Main>
  )
}
