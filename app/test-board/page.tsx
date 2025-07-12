import TestContainer from "@/components/common/test-container";
import { Flex, Title } from "@mantine/core";

export default function TestBoard () {
    return (
        <TestContainer>
            <Flex py="sm">
                <Title order={6}>ART BOARD EDITOR</Title>
            </Flex>
        </TestContainer>
    )
}