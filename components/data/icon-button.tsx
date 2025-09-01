import { ActionIcon, Tooltip } from '@mantine/core';
import { LucideIcon } from 'lucide-react';
import React from 'react';

type Props = {
  icon: LucideIcon,
  label: string,
  action: () => void,
  disabled?: boolean,
}

export default function IconButton(props: Props) {
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