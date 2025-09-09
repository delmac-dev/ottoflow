import { Group, ScrollArea, Stack, Text, Tooltip, ActionIcon, Input, Center } from '@mantine/core'
import { ChevronLeft, ChevronRight, Download, FilePlus2, LucideIcon, Minus, Save, Scroll, Trash } from 'lucide-react'
import snakeCase from "lodash.snakecase";
import React, { useEffect } from 'react'
import IconButton from './icon-button';
import { useStore } from 'zustand';
import { scheduleStore } from '@/lib/stores/schedule.store';
import { Control, useController, useFieldArray, useForm } from 'react-hook-form';

type IControl = Control<{
  data: Record<string, string>[];
}, any, {
  data: Record<string, string>[];
}>

export default function DataPanel() {
  const properties = useStore(scheduleStore, (s) => s.properties);
  const data = useStore(scheduleStore, (s) => s.data);
  const setData = useStore(scheduleStore, (s) => s.setData);

  const { handleSubmit, reset, control, register, formState: { isDirty } } = useForm({
    defaultValues: {
      data: data || []
    }
  });

  const { fields: rows, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  useEffect(() => {
    if (isDirty) {
      handleSubmit((data) => {
        setData(data.data);
      })();
    };
  }, [isDirty]);

  useEffect(() => {
    reset({ data: data || [] }, { keepDirty: false });
  }, [data]);

  const tools = [
    {
      icon: FilePlus2,
      label: 'Add',
      disabled: properties.length === 0,
      action: () => append(
        properties.reduce((acc, prop) => {
          acc[prop.key] = "";
          return acc;
        }, {} as Record<string, string>)
      )
    },
    {
      icon: Download,
      label: 'Export',
      action: () => console.log('Export'),
    },
  ];

  return (
    <Stack gap={0}>
      <Group bg="dark.6" justify='flex-end' px="xs" gap={4} className='h-8'>
        {tools.map(tool => (
          <IconButton key={tool.label} {...tool} />
        ))}
      </Group>
      <ScrollArea
        scrollbarSize={4}
        className='h-[calc(100vh-232px)]'
      >
        {rows.map((row, i) => {
          const offset = i * properties.length;

          return (
            <Stack key={row.id} className='group rounded-sm w-full bg-dark-700 p-0 gap-0 hover:bg-dark-500/25 focus-within:bg-dark-500/25'>
              <Group wrap='nowrap' className='w-full max-w-full h-6 gap-0 p-0 border-y border-transparent hover:border-dark-500 justify-start'>
                <Group className='w-9 shrink-0 h-full justify-end pr-1.5'>
                  <ChevronRight className='size-4 text-dark-200' />
                </Group>
                <button
                  className='h-full aspect-square flex items-center justify-center invisible group-hover:visible group-focus-within:visible cursor-pointer hover:bg-dark-400'
                  type="button"
                  onClick={() => remove(i)}
                >
                  <Trash className='size-4 text-dark-200' />
                </button>
              </Group>
              {properties.map((item, index) => (
                <RowForm
                  key={item.key}
                  key2={item.key}
                  position={(index + 1 + offset).toString().padStart(2, '0')}
                  i={i}
                  control={control}
                  type={item.type}
                />
              ))}
            </Stack>
          )
        })}
        {rows.length === 0 && (
          <Center className='h-full pt-14'>
            <Text className='text-dark-200 text-xs italic'>No data available. Please add data.</Text>
          </Center>
        )}
      </ScrollArea>
    </Stack>
  )
};

type IRowForm = {
  position: string;
  i: number;
  key2: string;
  type: string;
  control: IControl;
};

const RowForm = (props: IRowForm) => {
  const { position, key2, type, i, control } = props;
  const valueControl = useController({name: `data.${i}.${key2}`, control});
  const [value, setValue] = React.useState(valueControl.field.value);

  return (
    <div
      className='w-full max-w-full h-6 gap-0 p-0 border-y border-transparent hover:border-dark-500 focus-within:border-dark-500 flex nowrap'>
      <Group className='w-9 shrink-0 h-full justify-end pr-1.5'>
        <Text className='text-dark-200 text-sm font-medium capitalize'>
          {position}
        </Text>
      </Group>
      <Group className='h-full'>
        <Text className='text-blue-500 text-sm font-semibold capitalize text-nowrap'>
          {key2} {" :"}
        </Text>
      </Group>
      <Group className='flex-1 h-full overflow-x-hidden p-0'>
        <input
          className='h-full w-full flex px-2 text-sm font-medium text-dark-100 focus:outline-0'
          type={type}
          value={value}
          placeholder="string"
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => valueControl.field.onChange(value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.currentTarget.blur();
            }
          }}
        />
      </Group>
    </div>
  )
}