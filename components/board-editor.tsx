"use client";

import { cn } from "@/lib/utils";
import { Center, Container, Text } from "@mantine/core";

export default function BoardEditor() {
  return (
    <Container fluid className="relative bg-dark-800 h-full p-0" >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(var(--color-dark-600)_1px,transparent_1px)]",
        )}
      />
      <Center h={"100%"}>
        <Text size="xs">Board Editor</Text>
      </Center>
    </Container>
  )
}
