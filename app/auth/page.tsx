import TestContainer from "@/components/common/test-container";
import { Flex, Title } from "@mantine/core";

export default function Auth () {
    return (
        <TestContainer>
            <Flex py="sm">
                <Title order={6}>AUTH PAGE</Title>
            </Flex>
        </TestContainer>
    )
}