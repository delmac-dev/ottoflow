import TestContainer from "@/components/common/test-container";
import { Anchor, Center, Flex, Stack} from "@mantine/core";

export default function Home() {

  const pages = [
    {url: "/test-board", name: "Board Editor"},
    {url: "/test-schedule", name: "Schedule Editor"},
    {url: "/test-ai", name: "AI Prompting"},
  ]

  return (
    <TestContainer>
      <Stack mih="inherit" justify="center" py="xl" gap="xl">
        <Center flex={1} component="main">
          <Anchor c="dark.0" size="sm" href="/auth">
            Authentication
          </Anchor>
        </Center>
        <Flex component="footer" justify="center" gap="md">
          {pages.map(({url, name}) => (
            <Anchor
              c="dark.0"
              size="xs"
              key={url}
              href={url}
            >
              {name}
            </Anchor>
          ))}
        </Flex>
      </Stack>
    </TestContainer>
  );
}
