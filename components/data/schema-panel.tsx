import { Button, Combobox, Group, Input, ScrollArea, Stack, Text, UnstyledButton, useCombobox } from '@mantine/core';
import { ChevronDown, FilePlus2, Plus, Save, Trash, Type } from 'lucide-react';
import React, { useState } from 'react';
import IconButton from './icon-button';

const properties = [
  { type: 'text', value: 'name' },
  { type: 'text', value: 'start time' },
  { type: 'text', value: 'end time' },
  { type: 'text', value: 'date' }
]

export default function SchemaPanel() {
  const tools = [
    {
      icon: Plus,
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
        {properties.map(item => (
          <SchemaForm key={item.value} {...item} />
        ))}
      </ScrollArea>
    </Stack>
  )
}

const options = [
  { icon: Type, label: 'Text' }
];

const SchemaForm = (props: typeof properties[0]) => {
  const [chosenItem, setChosenItem] = useState<typeof options[0]>(options[0]);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Group mt={8} className='ml-2 gap-0.5 bg-dark-600 rounded-sm'>
      <Combobox
        store={combobox}
        width={148}
        position="bottom"
        onOptionSubmit={(val) => {
          setChosenItem(options[val as unknown as number]);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <button
            color='dark.2'
            className='bg-dark-600 h-7 rounded-l-sm px-2 cursor-pointer hover:bg-dark-500'
            onClick={() => combobox.toggleDropdown()}
          >
            <Group gap={"xs"}>
              <Group flex={1} gap={4}>
                <chosenItem.icon className='size-3.5' />
                <Text className='text-xs font-semibold lowercase'>{chosenItem.label}</Text>
              </Group>
              <ChevronDown className='size-3 text-dark-300' />
            </Group>
          </button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {options.map((item, index) => (
              <Combobox.Option
                value={index.toString()}
                key={item.label}
                className='px-2 py-2'
              >
                <Group>
                  <item.icon className='size-4' />
                  <Text className='text-xs font-semibold'>{item.label}</Text>
                </Group>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <input
        className='flex-1 px-2 bg-dark-600 text-xs font-semibold h-7 focus:outline-none focus:ring-1 focus:ring-blue-500'
        defaultValue={props.value}
      />
      <button className='bg-dark-600 h-7 rounded-r-sm px-2 cursor-pointer hover:bg-dark-500'>
        <Trash className='size-3.5 text-dark-200' />
      </button>
    </Group>
  )
}
