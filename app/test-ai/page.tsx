import TestContainer from "@/components/common/test-container";
import { Flex, Title } from "@mantine/core";

export default function TestAI () {
    return (
        <TestContainer>
            <Flex py="sm">
                <Title order={6}>AI CHAT TEST</Title>
            </Flex>
        </TestContainer>
    )
}