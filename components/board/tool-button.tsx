import { ActionIcon, Button, Combobox, Group, Text, Tooltip, useCombobox } from '@mantine/core';
import { ChevronDown, LucideIcon } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  icon: LucideIcon,
  label: string,
  action: () => void,
  disabled?: boolean,
}

export default function ToolButton(props: Props) {
  const { label, action, disabled } = props;
  return (
    <Tooltip label={label} position='bottom' h={24} color='dark.6' className='text-xs'>
      <ActionIcon
        onClick={action}
        disabled={disabled}
        variant='subtle'
        color='dark.2'
        size='input-xs'
      >
        <props.icon className='size-4' />
      </ActionIcon>
    </Tooltip>
  )
};

function ToolButtonMultiple(props: { tools: Props[] }) {
  const [chosenItem, setChosenItem] = useState<Props>(props.tools[0]);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  return (
    <Group gap={0}>
      <ToolButton {...chosenItem} />
      <Combobox
        store={combobox}
        width={148}
        position="bottom"
        onOptionSubmit={(val) => {
          setChosenItem(props.tools[val as unknown as number]);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Button 
            size='compact-xs'
            px={0}
            variant='subtle'
            color='dark.2'
            onClick={() => combobox.toggleDropdown()}
          >
            <ChevronDown className='size-3' />
          </Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {props.tools.map((item, index) => (
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
    </Group>
  )
};

ToolButtonMultiple.displayName = "ToolButton.Multiple";

ToolButton.Multiple = ToolButtonMultiple;