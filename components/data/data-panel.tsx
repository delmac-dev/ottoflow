import { Group, ScrollArea, Stack, Text, Tooltip, ActionIcon, Input } from '@mantine/core'
import { ChevronLeft, ChevronRight, FilePlus2, LucideIcon, Minus, Save, Scroll, Trash } from 'lucide-react'
import snakeCase from "lodash.snakecase";
import React from 'react'
import IconButton from './icon-button';

const data: Record<string, string>[] = [
  {
    id: "1",
    name: 'COE 204: Data Structures',
    start_time: '10:00:00Z',
    end_time: '12:00:00Z',
    date: 'Tuesday'
  },
  {
    id: "2",
    name: 'COE 205: Algorithms',
    start_time: '10:00:00Z',
    end_time: '12:00:00Z',
    date: 'Wednesday'
  },
  {
    id: "3",
    name: 'COE 206: Databases',
    start_time: '10:00:00Z',
    end_time: '12:00:00Z',
    date: 'Thursday'
  },
  {
    id: "4",
    name: 'COE 207: Operating Systems',
    start_time: '10:00:00Z',
    end_time: '12:00:00Z',
    date: 'Friday'
  },
  {
    id: "5",
    name: 'COE 208: Software Engineering',
    start_time: '10:00:00Z',
    end_time: '12:00:00Z',
    date: 'Saturday'
  }
];

const properties = [
  {type: 'text', key: 'name'},
  {type: 'text', key: 'start time'},
  {type: 'text', key: 'end time'},
  {type: 'text', key: 'date'}
]

export default function DataPanel() {
  const tools = [
    {
      icon: FilePlus2,
      label: 'Add',
      action: () => console.log('Add'),
    },
    {
      icon: Save,
      label: 'Save',
      action: () => console.log('Save'),
    },
  ];

  return (
    <Stack gap={0}>
      <Group bg="dark.6" justify='flex-start' px="xs" gap={4} className='h-8'>
        {tools.map(tool => (
          <IconButton key={tool.label} {...tool} />
        ))}
      </Group>
      <ScrollArea
        offsetScrollbars 
        scrollbarSize={4}
        overscrollBehavior="contain"
        className='h-[calc(100vh-232px)]'
      >
        {data.filter((_, i) => !(i > 4)).map(item => (
          <DataForm key={item["id"]} {...item} />
        ))}
      </ScrollArea>
    </Stack>
  )
};

type DataFormProps = Record<string, string>;

const DataForm = (props: DataFormProps) => {
  const leftTools = [
    { icon: ChevronRight, label: 'Expand', action: () => {} }
  ];

  const RightTools = [
    { icon: Trash, label: 'Delete', action: () => {} },
  ]

  return (
    <Stack gap={6} mt={8} className='rounded-sm bg-dark-600 ml-1 p-1.5'>
      <Group justify='space-between'>
        {leftTools.map(tool => (
          <FormToolButton key={tool.label} {...tool} />
        ))}
        {RightTools.map(tool => (
          <FormToolButton key={tool.label} {...tool} />
        ))}
      </Group>
      {properties.map(item => (
        <Group key={item.key}>
          <Text className='flex-1 text-dark-100 text-xs font-semibold capitalize'>{item.key}</Text>
          <Input 
            size='xs' 
            variant='unstyled' 
            classNames={{input: "text-xs font-medium text-dark-100", }}
            className='flex-1 px-2 rounded-sm bg-dark-500' 
            defaultValue={props[snakeCase(item.key)]} 
          />
        </Group>
      ))}
    </Stack>
  );
};

type FormToolButtonProps = {
  icon: LucideIcon,
  label: string,
  action: () => void,
  disabled?: boolean,
}

const FormToolButton = (props: FormToolButtonProps) => {
  return (
    <Tooltip label={props.label} position='bottom' h={24} color='dark.6' className='text-xs'>
      <ActionIcon variant='subtle' color='dark.2' size={20} onClick={props.action} disabled={props.disabled} className='size-1 p-0'>
        <props.icon className='size-3.5 text-dark-200' />
      </ActionIcon>
    </Tooltip>
  )
}