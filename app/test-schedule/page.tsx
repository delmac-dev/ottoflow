import TestContainer from "@/components/common/test-container";
import { Flex, Title } from "@mantine/core";

export default function TestSchedule () {
    return (
        <TestContainer>
            <Flex py="sm">
                <Title order={6}>SCHEDULE EDITOR TEST</Title>
            </Flex>
        </TestContainer>
    )
}