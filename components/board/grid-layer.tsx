import { Stage, Layer, Line } from "react-konva";
import { useState, useEffect } from "react";
import { useMantineTheme } from "@mantine/core";

type Props = {
  width: number;
  height: number;
  cellSize?: number;
};

export default function GridLayer({ width, height, cellSize = 50 }: Props) {
  const theme = useMantineTheme();
  const lines = [];
  const strokeColor = theme.colors.dark[6];

  // Vertical lines
for (let i = 0; i < width / cellSize; i++) {
  const x = i * cellSize + 0.5; // <- shift by half pixel
  lines.push(
    <Line
      key={`v${i}`}
      points={[x, 0, x, height]}
      stroke={strokeColor}
      strokeWidth={1}
    />
  );
}

// Horizontal lines
for (let j = 0; j < height / cellSize; j++) {
  const y = j * cellSize + 0.5;
  lines.push(
    <Line
      key={`h${j}`}
      points={[0, y, width, y]}
      stroke={strokeColor}
      strokeWidth={1}
    />
  );
}

  return (
    <Layer listening={false}>
      {lines}
    </Layer>
  );
};