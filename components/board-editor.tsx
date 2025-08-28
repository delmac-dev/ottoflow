"use client";

import { Box, Container, Group, Stack, Text, Tooltip } from "@mantine/core";
import { CaseSensitiveIcon, CircleIcon, FrameIcon, PentagonIcon, PenToolIcon, RectangleHorizontalIcon, StarIcon, TextCursorIcon } from "lucide-react";
import Canvas from "./canvas";
import { useElementSize } from "@mantine/hooks";
import { useEffect } from "react";
import BackgroundDot from "./ui/background-dots";
import { useAppStore } from "@/lib/stores/app.store";

export default function BoardEditor() {
  const { ref, width, height } = useElementSize();
  const setCanvasOptions = useAppStore((s) => s.setCanvasOptions);

  useEffect(() => {
    setCanvasOptions({ width, height });
  }, [width, height, setCanvasOptions]);

  const tools = [
    { name: "Frame", shortCut: "F", icon: FrameIcon},
    { name: "Rect", shortCut: "R", icon: RectangleHorizontalIcon},
    { name: "Circle", shortCut: "C", icon: CircleIcon},
    { name: "Polygon", shortCut: "Ctrl + P", icon: PentagonIcon},
    { name: "Star", shortCut: "S", icon: StarIcon},
    { name: "Text", shortCut: "T", icon: TextCursorIcon},
    { name: "Pen", shortCut: "P", icon: PenToolIcon},
  ];

  const property_sections = ["Variables", "Position", "Layout", "Appearance", "Typography", "Effects"]

  return (
    <Container fluid className="w-full h-[calc(100dvh_-_48px)] p-0">
      <Box ref={ref} className="relative bg-dark-800/50 w-full h-full p-0" >
        <BackgroundDot />
        {/* CANVAS */}
        <Canvas />

        {/* BOARD CONTROLS */}
        <Box>
          {/* zoom in, zoom out, zoom 100 */}
        </Box>

        {/* ELEMENT TREE */}
        <Box>
          {/*  */}
        </Box>

        {/* ELEMENT PROPERTIES FORM */}
        <Stack className="absolute right-2 w-56 inset-y-2 bg-dark-700 border border-dark-500 rounded-md gap-0">
          <Group className="h-10 border-b border-dark-500 px-2 uppercase text-xs font-semibold">
            board editor
          </Group>
          <Stack className="flex-1 gap-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {property_sections.map((section) => (
              <Stack key={section} className="p-0 gap-0 not-last:border-b border-dark-500">
                <Box className="p-sm pb-xs">
                  <Text className="text-xs font-semibold text-dark-100">{section}</Text>
                </Box>
                <Stack className="p-sm pt-xs gap-xs">
                  <Group className="gap-xs">
                    <Box className="h-7 rounded-sm bg-dark-600 flex-1" />
                    <Box className="h-7 rounded-sm bg-dark-600 flex-1" />
                  </Group>
                  <Group className="gap-xs">
                    <Box className="h-7 rounded-sm bg-dark-600 flex-1" />
                    <Box className="h-7 rounded-sm bg-dark-600 flex-1" />
                  </Group>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* ELEMENT SELECTOR */}
        <Group className="absolute bottom-2 left-1/2 -translate-x-1/2 gap-0 border border-dark-500 bg-dark-700 rounded-md">
          {tools.map((tool, index) => (
            <Tooltip
              classNames={{
                tooltip: "bg-dark-900 border border-dark-500 text-xs text-dark-100 font-bold",
                arrow: "border border-dark-600"
              }}
              key={index} 
              arrowSize={10} 
              label={<p className="space-x-3"><span>{tool.name}</span><span className="text-dark-300">{tool.shortCut}</span></p>}
              withArrow position="top"
            >
              <Box className="aspect-square h-10 flex items-center justify-center not-last:border-r border-dark-600 cursor-pointer hover:bg-dark-600">
                <tool.icon className="text-dark-50 size-5" />
              </Box>
            </Tooltip>
          ))}
        </Group>
      </Box>
    </Container>
  )
}
