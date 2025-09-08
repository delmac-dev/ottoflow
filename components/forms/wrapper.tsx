import { cn } from "@/lib/utils";
import { Group, Stack, Text } from "@mantine/core";

type Props = {
  label: string;
  children: React.ReactNode;
  noBorder?: boolean;
}

export default function Wrapper({label, children, noBorder}: Props) {
  return (
    <Stack className={cn('w-full p-0 gap-0 border-b border-dark-400 py-xs', {'border-b-0': noBorder})}>
      <Group className='w-full px-xs pb-xs'>
        <Text className='text-xs font-medium text-gray-300'>
          {label}
        </Text>
      </Group>
      <div className='grid grid-cols-2 gap-2 px-2 w-full'>
        {children}
      </div>
    </Stack>
  )
};